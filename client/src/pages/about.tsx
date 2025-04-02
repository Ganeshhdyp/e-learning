import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LucideShield, LucideBook, LucideMail, LucideCalendar, LucideMapPin, LucideAward, LucideGlobe } from "lucide-react";

export default function AboutAuthor() {
  return (
    <div className="space-y-8 pb-10">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-2">About the Author</h1>
        <p className="text-indigo-100 text-lg">Meet the expert behind this comprehensive cybersecurity curriculum</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-indigo-500">
          <CardHeader className="pb-0">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl gradient-text flex items-center gap-2">
                  <LucideShield className="h-6 w-6 text-indigo-600" />
                  Dr. Alex Johnson
                </CardTitle>
                <CardDescription className="text-lg font-medium mt-1">
                  Ph.D. in Information Security, 15+ years industry experience
                </CardDescription>
              </div>
              <Badge variant="outline" className="bg-indigo-50 text-indigo-800 border-indigo-200 px-3 py-1">
                Cybersecurity Expert
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="prose prose-indigo">
              <p className="mb-4 text-gray-700 leading-relaxed">
                Dr. Alex Johnson is a distinguished professor of Cybersecurity and Information Assurance with over 15 years of industry and academic experience. Their expertise spans network security, cryptography, and cyber threat intelligence.
              </p>
              <p className="mb-4 text-gray-700 leading-relaxed">
                As a former security consultant for Fortune 500 companies and government agencies, Dr. Johnson brings real-world scenarios and practical knowledge to this comprehensive cybersecurity curriculum.
              </p>
              <p className="mb-4 text-gray-700 leading-relaxed">
                Author of "Modern Approaches to Cybersecurity Defense" and "Network Security Fundamentals", Dr. Johnson's teaching methodology focuses on balancing theoretical concepts with hands-on practical applications.
              </p>
            </div>
            
            <Separator className="my-6" />
            
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gradient-text">
                <LucideAward className="h-5 w-5 mr-2" />
                Areas of Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition-all">Network Security</Badge>
                <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition-all">Penetration Testing</Badge>
                <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition-all">Cryptography</Badge>
                <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition-all">Security Architecture</Badge>
                <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition-all">Incident Response</Badge>
                <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition-all">Threat Intelligence</Badge>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <blockquote className="border-l-4 border-indigo-500 pl-5 py-2 italic text-gray-700 bg-indigo-50 rounded-r-md">
              "Cybersecurity education must go beyond theoretical concepts and provide students with the practical skills to address real-world threats and vulnerabilities. This curriculum is designed to blend foundational knowledge with hands-on experience."
            </blockquote>
            
            <div className="mt-6 flex justify-end">
              <Button className="gradient-bg text-white">
                <LucideBook className="mr-2 h-4 w-4" />
                View Curriculum
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-8">
          <Card className="shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-t-4 border-indigo-500">
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50">
              <div className="flex justify-center mb-5">
                <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                  <AvatarFallback className="gradient-bg text-2xl font-bold text-white">AJ</AvatarFallback>
                </Avatar>
              </div>
              <h3 className="text-xl font-semibold text-center gradient-text mb-4">Contact Information</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center space-x-3">
                  <LucideMail className="h-5 w-5 text-indigo-600" />
                  <div>
                    <span className="text-sm font-medium text-gray-500">Email:</span>
                    <p className="text-indigo-600">alex.johnson@cyber-edu.org</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <LucideMapPin className="h-5 w-5 text-indigo-600" />
                  <div>
                    <span className="text-sm font-medium text-gray-500">Office:</span>
                    <p className="text-indigo-600">CS Building, Room 305</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <LucideCalendar className="h-5 w-5 text-indigo-600" />
                  <div>
                    <span className="text-sm font-medium text-gray-500">Office Hours:</span>
                    <p className="text-indigo-600">Mon/Wed 2-4pm</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-indigo-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl gradient-text flex items-center">
                <LucideBook className="h-5 w-5 mr-2" />
                Publications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors">
                <h4 className="font-medium text-indigo-900">Modern Approaches to Cybersecurity Defense</h4>
                <p className="text-sm text-indigo-700">CyberPress, 2022</p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors">
                <h4 className="font-medium text-indigo-900">Network Security Fundamentals</h4>
                <p className="text-sm text-indigo-700">InfoSec Publishing, 2019</p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors">
                <h4 className="font-medium text-indigo-900">Threat Intelligence in Practice</h4>
                <p className="text-sm text-indigo-700">Journal of Cybersecurity, 2021</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-indigo-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl gradient-text flex items-center">
                <LucideGlobe className="h-5 w-5 mr-2" />
                Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">Join Dr. Johnson's cybersecurity community for updates, resources, and discussions.</p>
              <Button variant="outline" className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                Join Community Forum
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}