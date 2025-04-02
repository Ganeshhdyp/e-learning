import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Check } from 'lucide-react';
import { SQL_INJECTION_EXAMPLES } from '@/lib/constants';

export default function SqlInjection() {
  const [demoInput, setDemoInput] = useState('');
  const [queryResult, setQueryResult] = useState('');
  const [vulnerable, setVulnerable] = useState(true);
  
  const generateQuery = () => {
    if (vulnerable) {
      // Vulnerable query simulation
      setQueryResult(`SELECT * FROM users WHERE username = '${demoInput}' AND password = 'password123';`);
    } else {
      // Parameterized query simulation
      setQueryResult('PREPARE statement FROM "SELECT * FROM users WHERE username = ? AND password = ?";');
      setQueryResult(prev => prev + '\nEXECUTE statement USING @username, @password;');
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="bg-secondary bg-opacity-10 px-6 py-4 border-b border-neutral-200">
          <h2 className="text-2xl font-heading font-bold text-neutral-800">SQL Injection: Understanding & Prevention</h2>
          <p className="text-neutral-600 mt-1">Learn how SQL injection attacks work and how to protect your applications</p>
        </div>
        
        <div className="p-6">
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">What is SQL Injection?</h3>
            <p className="mb-4">
              SQL Injection is a code injection technique that exploits security vulnerabilities in an application's software. 
              It allows attackers to insert malicious SQL statements into entry fields for execution by the backend database.
            </p>
            
            <div className="mt-6 bg-neutral-50 border border-neutral-200 rounded-md overflow-hidden">
              <div className="bg-neutral-100 px-4 py-2 border-b border-neutral-200 font-medium">Common SQL Injection Example</div>
              <div className="p-4">
                <p className="mb-2">Consider this vulnerable SQL query in an application:</p>
                <div className="bg-neutral-800 text-white font-mono text-sm p-3 rounded">
                  SELECT * FROM users WHERE username = '$username' AND password = '$password'
                </div>
                
                <p className="mt-4 mb-2">
                  If a user enters <code className="bg-neutral-200 px-1 py-0.5 rounded text-neutral-800 font-mono text-sm">' OR '1'='1</code> as the username, the query becomes:
                </p>
                <div className="bg-neutral-800 text-white font-mono text-sm p-3 rounded">
                  SELECT * FROM users WHERE username = '' OR '1'='1' AND password = 'anything'
                </div>
                
                <p className="mt-3 text-error font-medium">This condition is always true, potentially allowing access without a valid password!</p>
              </div>
            </div>
          </div>
          
          {/* Interactive Demo Section */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">Interactive SQL Injection Simulator</h3>
            <p className="mb-4">Try entering SQL injection strings to see how they affect queries. Toggle between vulnerable and safe implementations.</p>
            
            <div className="mb-4">
              <Label className="block text-sm font-medium text-neutral-700 mb-1">Username Input:</Label>
              <div className="flex">
                <Input
                  value={demoInput}
                  onChange={(e) => setDemoInput(e.target.value)}
                  className="flex-1 rounded-l-md"
                  placeholder="Try: admin' OR '1'='1"
                />
                <Button
                  onClick={generateQuery}
                  className="bg-secondary text-white rounded-l-none hover:bg-opacity-90"
                >
                  Execute
                </Button>
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <span className="mr-3 text-sm font-medium">Query Type:</span>
              <RadioGroup
                value={vulnerable ? "vulnerable" : "safe"}
                onValueChange={(value) => setVulnerable(value === "vulnerable")}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vulnerable" id="vulnerable" />
                  <Label htmlFor="vulnerable" className="text-error">Vulnerable</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="safe" id="safe" />
                  <Label htmlFor="safe" className="text-success">Parameterized (Safe)</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="bg-neutral-800 text-white font-mono text-sm p-3 rounded mb-2">
              <div className="mb-2 text-neutral-400">-- Generated SQL Query:</div>
              <div style={{ whiteSpace: 'pre-line' }}>{queryResult || 'No query executed yet'}</div>
            </div>
          </div>
          
          {/* Prevention Section */}
          <div>
            <h3 className="text-xl font-medium mb-4">Prevention Techniques</h3>
            <ul className="space-y-3 list-disc list-inside">
              <li>Use <strong>parameterized statements</strong> (prepared statements) with bound variables</li>
              <li>Apply <strong>input validation</strong> using whitelisting rather than blacklisting</li>
              <li>Employ <strong>stored procedures</strong> for database access</li>
              <li>Implement <strong>least privilege</strong> by restricting database permissions</li>
              <li>Enable <strong>Web Application Firewalls (WAF)</strong> to detect and block SQL injection attempts</li>
            </ul>
            
            <div className="mt-6 p-4 bg-success bg-opacity-10 border-l-4 border-success rounded">
              <h4 className="font-medium mb-2">Best Practice Example:</h4>
              <div className="font-mono text-sm bg-white p-3 rounded border border-neutral-200">
                <div className="text-neutral-500">// PHP PDO Example with prepared statements</div>
                <div className="text-neutral-800">
                  $stmt = $pdo{'->'} prepare('SELECT * FROM users WHERE username = ? AND password = ?');<br />
                  $stmt{'->'} execute([$username, $password]);
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Examples */}
          <div className="mt-8">
            <h3 className="text-xl font-medium mb-4">Common SQL Injection Examples</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SQL_INJECTION_EXAMPLES.map((example, index) => (
                <Card key={index} className="border-neutral-200">
                  <CardHeader className="pb-2">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-error mr-2 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Example {index + 1}</h4>
                        <p className="text-sm text-neutral-600">{example.explanation}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-neutral-500 mb-1">Vulnerable Query:</p>
                        <div className="bg-neutral-100 p-2 rounded font-mono text-xs">{example.vulnerable}</div>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 mb-1">Attack Input:</p>
                        <div className="bg-error bg-opacity-10 text-error p-2 rounded font-mono text-xs">{example.attack}</div>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 mb-1">Resulting Query:</p>
                        <div className="bg-neutral-800 text-white p-2 rounded font-mono text-xs">{example.exploited}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
