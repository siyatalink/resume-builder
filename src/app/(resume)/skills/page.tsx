"use client";
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Skills = () => {
  const [skills, setSkills] = useState(['', '', '']);

  const addSkill = () => {
    setSkills([...skills, '']);
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = skills.map((skill, i) => 
      i === index ? value : skill
    );
    setSkills(updatedSkills);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Skills</h1>
      <p className="text-gray-600 mb-6">Add your key skills to showcase your expertise.</p>
      
      <Card>
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
      
      <Button onClick={addSkill} variant="outline" className="w-full my-4">+ Add Another Skill</Button>
      
      <div className="flex justify-between">
        <Button variant="outline">Previous</Button>
        <Button className="bg-red-500 hover:bg-red-600"
        >Generate Resume</Button>
      </div>
    </div>
  );
};

export default Skills;