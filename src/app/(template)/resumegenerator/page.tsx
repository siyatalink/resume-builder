"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";



interface Template {
  id: number;
  name: string;
  preview: string;
  content: string;
}

export default function ResumeGenerator() {
  const router = useRouter();
  
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [resumeContent, setResumeContent] = useState<string>('');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    education: '',
    skills: ''
  });

  const templates: Template[] = [
    { 
      id: 1, 
      name: 'Professional',
      preview: '/api/placeholder/300/200',
      content: `[NAME]
[EMAIL] | [PHONE]

Professional Summary:
[A brief summary of your professional experience and skills]

Experience:
[Your work experience]

Education:
[Your educational background]

Skills:
[Your key skills]`
    },
    { 
      id: 2, 
      name: 'Creative',
      preview: '/api/placeholder/300/200',
      content: `[NAME]
Creative Professional
[EMAIL] | [PHONE]

About Me:
[A creative introduction about yourself]

Professional Journey:
[Your work experience in a creative format]

Educational Background:
[Your educational details]

Skill Set:
[Your key skills in a creative layout]`
    },
    // Add more templates as needed
  ];

  useEffect(() => {
    // Simulating data from previous pages
    setUserData({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '(123) 456-7890',
      experience: 'Software Engineer at Tech Co. (2018-Present)',
      education: 'B.S. Computer Science, University of Example (2014-2018)',
      skills: 'JavaScript, React, Node.js, Python'
    });
  }, []);

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    let populatedContent = template.content
      .replace('[NAME]', userData.name)
      .replace('[EMAIL]', userData.email)
      .replace('[PHONE]', userData.phone)
      .replace('[Your work experience]', userData.experience)
      .replace('[Your educational background]', userData.education)
      .replace('[Your key skills]', userData.skills);
    setResumeContent(populatedContent);
  };

  return (
    <div className="flex h-screen">
      <div className="w-2/3 p-4 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Choose a Resume Template</h1>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="cursor-pointer transition-all duration-300 hover:shadow-lg relative group"
              onClick={() => handleTemplateSelect(template)}
            >
              <CardContent className="p-4">
                <img src={template.preview} alt={template.name} className="w-full h-40 object-cover mb-2" />
                <p className="text-center font-semibold">{template.name}</p>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button className="bg-white text-black hover:bg-gray-200">Use Template</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="w-1/3 bg-gray-100 p-4 overflow-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Your Resume</h2>
        {selectedTemplate ? (
          <Textarea
            value={resumeContent}
            onChange={(e) => setResumeContent(e.target.value)}
            className="w-full h-[calc(100vh-150px)]"
            placeholder="Your resume content will appear here. Edit as needed."
          />
        ) : (
          <p>Select a template to start editing your resume.</p>
        )}
        {selectedTemplate && (
          <div className="mt-4 flex justify-between">
            <Button variant="outline" onClick={() => router.push('/skills-and-projects')}>Back</Button>
            <Button className="bg-green-500 hover:bg-green-600">
              Finalize Resume
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}