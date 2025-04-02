import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle, Code, Shield } from 'lucide-react';
import { XSS_EXAMPLES } from '@/lib/constants';

export default function XSS() {
  const [userInput, setUserInput] = useState('');
  const [sanitizedInput, setSanitizedInput] = useState('');
  const [outputDisplay, setOutputDisplay] = useState<'unsafe' | 'safe' | null>(null);
  
  const sanitize = () => {
    // Simple sanitization for demo purposes
    const sanitized = userInput
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/\'/g, '&#39;');
      
    setSanitizedInput(sanitized);
  };
  
  const showUnsanitized = () => {
    setOutputDisplay('unsafe');
  };
  
  const showSanitized = () => {
    setOutputDisplay('safe');
    sanitize();
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="bg-secondary bg-opacity-10 px-6 py-4 border-b border-neutral-200">
          <h2 className="text-2xl font-heading font-bold text-neutral-800">Cross-Site Scripting (XSS) Attacks</h2>
          <p className="text-neutral-600 mt-1">Understanding how XSS attacks work and implementing effective defenses</p>
        </div>
        
        <div className="p-6">
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">What is Cross-Site Scripting?</h3>
            <p className="mb-4">
              Cross-Site Scripting (XSS) is a client-side code injection attack where attackers inject malicious scripts 
              into otherwise benign websites. When other users visit these compromised pages, their browsers execute the 
              injected code.
            </p>
            
            <div className="mt-6 bg-neutral-50 border border-neutral-200 rounded-md">
              <div className="bg-neutral-100 px-4 py-2 border-b border-neutral-200 font-medium">Types of XSS Attacks</div>
              <div className="p-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="border border-neutral-200 rounded-md p-3">
                    <h4 className="font-medium mb-2">Reflected XSS</h4>
                    <p className="text-sm">
                      Non-persistent attack where malicious script is part of the user's request and immediately reflected 
                      back in the server's response.
                    </p>
                  </div>
                  <div className="border border-neutral-200 rounded-md p-3">
                    <h4 className="font-medium mb-2">Stored XSS</h4>
                    <p className="text-sm">
                      Persistent attack where malicious script is stored on the target server (e.g., in a database) and 
                      later served to multiple users.
                    </p>
                  </div>
                  <div className="border border-neutral-200 rounded-md p-3">
                    <h4 className="font-medium mb-2">DOM-based XSS</h4>
                    <p className="text-sm">
                      Attack occurring entirely in the browser when client-side JavaScript modifies the DOM in an unsafe way.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Interactive Demo Section */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">XSS Vulnerability Demonstration</h3>
            <p className="mb-4">
              Enter some text with embedded script tags to see how proper sanitization prevents XSS attacks.
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-1">Enter User Input:</label>
              <Textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full"
                placeholder={"Try: <script>alert('XSS Attack!')</script> or <img src='x' onerror='alert(\"XSS\")'>"}
                rows={3}
              />
            </div>
            
            <div className="flex space-x-3 mb-6">
              <Button
                onClick={showUnsanitized}
                variant="destructive"
              >
                Show Unsanitized (Vulnerable)
              </Button>
              <Button
                onClick={showSanitized}
                variant="outline"
                className="bg-success text-white hover:bg-success/90"
              >
                Show Sanitized (Safe)
              </Button>
            </div>
            
            <div className="bg-neutral-50 border border-neutral-200 rounded-md mb-4">
              <div 
                className={
                  outputDisplay === 'unsafe' 
                    ? "bg-error text-white px-4 py-2 border-b border-neutral-200 font-medium"
                    : outputDisplay === 'safe'
                    ? "bg-success text-white px-4 py-2 border-b border-neutral-200 font-medium"
                    : "px-4 py-2 border-b border-neutral-200 font-medium"
                }
              >
                <span>
                  {outputDisplay === 'unsafe' 
                    ? 'Unsanitized Output (Vulnerable)' 
                    : outputDisplay === 'safe' 
                    ? 'Sanitized Output (Safe)' 
                    : 'Output'}
                </span>
              </div>
              <div className="p-4 min-h-[100px]">
                {/* Using a span with text content for the sanitized version */}
                {outputDisplay === 'safe' && <span>{sanitizedInput}</span>}
                
                {/* Using dangerouslySetInnerHTML for the vulnerable version - FOR DEMO ONLY */}
                {outputDisplay === 'unsafe' && <div dangerouslySetInnerHTML={{ __html: userInput }} />}
                
                {!outputDisplay && <div className="text-neutral-500 italic">Select an output option above</div>}
              </div>
            </div>
            
            {outputDisplay === 'unsafe' && (
              <div className="p-3 bg-error bg-opacity-10 border-l-4 border-error rounded text-sm">
                <strong>Warning:</strong> In a real application, this could allow attackers to execute malicious JavaScript, 
                steal cookies/session data, redirect users to malicious sites, or modify page content.
              </div>
            )}
          </div>
          
          {/* Prevention Section */}
          <div>
            <h3 className="text-xl font-medium mb-4">XSS Prevention Techniques</h3>
            
            <div className="space-y-4 mb-6">
              <div className="border-l-4 border-primary p-3 bg-primary bg-opacity-5">
                <h4 className="font-medium mb-1">Output Encoding</h4>
                <p className="text-sm">
                  Convert special characters to their HTML entity equivalents before rendering content. Different contexts 
                  (HTML, JavaScript, CSS, URLs) require different encoding strategies.
                </p>
              </div>
              
              <div className="border-l-4 border-primary p-3 bg-primary bg-opacity-5">
                <h4 className="font-medium mb-1">Content Security Policy (CSP)</h4>
                <p className="text-sm">
                  Implement CSP headers to restrict which sources of content can be loaded and executed by the browser, 
                  effectively preventing the execution of injected scripts.
                </p>
              </div>
              
              <div className="border-l-4 border-primary p-3 bg-primary bg-opacity-5">
                <h4 className="font-medium mb-1">Input Validation</h4>
                <p className="text-sm">
                  Validate and sanitize all user inputs on both client and server sides. Use whitelist validation whenever 
                  possible to accept only known good input.
                </p>
              </div>
              
              <div className="border-l-4 border-primary p-3 bg-primary bg-opacity-5">
                <h4 className="font-medium mb-1">Modern Frameworks</h4>
                <p className="text-sm">
                  Use modern frameworks like React, Angular, or Vue.js that automatically escape content before rendering, 
                  providing built-in protection against XSS.
                </p>
              </div>
            </div>
            
            <div className="bg-success bg-opacity-10 p-4 rounded-md border border-success border-opacity-50">
              <h4 className="font-medium mb-2">Secure Coding Examples:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium mb-1 text-error">Vulnerable Code:</div>
                  <div className="bg-white font-mono text-sm p-2 rounded border border-neutral-200">
                    // Dangerous code<br />
                    element.innerHTML = userInput;
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-1 text-success">Secure Code:</div>
                  <div className="bg-white font-mono text-sm p-2 rounded border border-neutral-200">
                    // Safe alternative<br />
                    element.textContent = userInput;
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* XSS Examples */}
          <div className="mt-8">
            <h3 className="text-xl font-medium mb-4">Common XSS Attack Vector Examples</h3>
            
            <Tabs defaultValue="reflected">
              <TabsList className="mb-4">
                <TabsTrigger value="reflected">Reflected XSS</TabsTrigger>
                <TabsTrigger value="stored">Stored XSS</TabsTrigger>
                <TabsTrigger value="dom">DOM-based XSS</TabsTrigger>
              </TabsList>
              
              {XSS_EXAMPLES.map((example, index) => (
                <TabsContent key={index} value={example.type.toLowerCase().split(' ')[0]}>
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-error mr-2 mt-0.5" />
                        <div>
                          <h4 className="font-medium">{example.type}</h4>
                          <p className="text-sm text-neutral-600">{example.explanation}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-neutral-500 mb-1">Vulnerable Code/Context:</p>
                          <div className="bg-neutral-100 p-2 rounded font-mono text-xs">{example.vulnerable}</div>
                        </div>
                        <div>
                          <p className="text-xs text-neutral-500 mb-1">Attack Payload:</p>
                          <div className="bg-error bg-opacity-10 text-error p-2 rounded font-mono text-xs">{example.attack}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
      
      {/* Additional Resources */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-primary mr-2" />
            <h3 className="font-medium">Additional XSS Prevention Resources</h3>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li><a href="https://owasp.org/www-community/attacks/xss/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OWASP XSS Prevention Cheat Sheet</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">MDN Content Security Policy</a></li>
            <li><a href="https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OWASP XSS Prevention Cheat Sheet</a></li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
