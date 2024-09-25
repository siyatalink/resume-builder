"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const SkillsAndProjects = () => {
    const router = useRouter();
  const [skills, setSkills] = useState(['', '', '']);
  const [projects, setProjects] = useState([{ name: '', description: '' }]);

  const addSkill = () => {
    setSkills([...skills, '']);
  };

  const handleSkillChange = (index: number, value: string) => {
    const updatedSkills = skills.map((skill, i) => 
      i === index ? value : skill
    );
    setSkills(updatedSkills);
  };

  const addProject = () => {
    setProjects([...projects, { name: '', description: '' }]);
  };

  const handleProjectChange = (index: number, field: string, value: string) => {
    const updatedProjects = projects.map((project, i) => 
      i === index ? { ...project, [field]: value } : project
    );
    setProjects(updatedProjects);
  };

  const handleGenerateResume = () => {
    router.push('resumegenerator');
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Skills and Projects</h1>
      <p className="text-gray-600 mb-6">Add your key skills and projects to showcase your expertise.</p>
      
      <h2 className="text-xl font-semibold mb-4">Skills</h2>
      <Card className="mb-6">
        <CardContent className="pt-6">
          {skills.map((skill, index) => (
            <div key={index} className="mb-4">
              <Input
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                placeholder={`Skill ${index + 1}`}
              />
            </div>
          ))}
        </CardContent>
      </Card>
      
      <Button onClick={addSkill} variant="outline" className="w-full mb-6">+ Add Another Skill</Button>
      
      <h2 className="text-xl font-semibold mb-4">Projects</h2>
      {projects.map((project, index) => (
        <Card key={index} className="mb-6">
          <CardContent className="pt-6">
            <Input
              value={project.name}
              onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
              placeholder="Project Name"
              className="mb-2"
            />
            <Textarea
              value={project.description}
              onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
              placeholder="Project Description"
              className="mb-2"
            />
          </CardContent>
        </Card>
      ))}
      
      <Button onClick={addProject} variant="outline" className="w-full mb-6">+ Add Another Project</Button>
      
      <div className="flex justify-between">
        <Button variant="outline">Previous</Button>
        <Button 
      className="bg-red-500 hover:bg-red-600" 
      onClick={handleGenerateResume}
    >
      Next
    </Button>
      </div>
    </div>
  );
};

export default SkillsAndProjects;