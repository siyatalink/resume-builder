"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const Education = () => {
  const router = useRouter();
  const [schools, setSchools] = useState([{
    school: '',
    degree: '',
    graduationYear: '',
    gpa: '',
    description: ''
  }]);

  const addSchool = () => {
    setSchools([...schools, {
      school: '',
      degree: '',
      graduationYear: '',
      gpa: '',
      description: ''
    }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedSchools = schools.map((school, i) => 
      i === index ? { ...school, [field]: value } : school
    );
    setSchools(updatedSchools);
  };

  const handleNext = () => {
    router.push('/skills');
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Education</h1>
      <p className="text-gray-600 mb-6">Add your educational background to showcase your qualifications.</p>
      
      {schools.map((school, index) => (
        <Card key={index} className="mb-6">
          <CardContent className="pt-6">
            <Input
              value={school.school}
              onChange={(e) => handleInputChange(index, 'school', e.target.value)}
              placeholder="School"
              className="mb-2"
            />
            <Input
              value={school.degree}
              onChange={(e) => handleInputChange(index, 'degree', e.target.value)}
              placeholder="Degree"
              className="mb-2"
            />
            <div className="flex gap-2 mb-2">
              <Input
                value={school.graduationYear}
                onChange={(e) => handleInputChange(index, 'graduationYear', e.target.value)}
                placeholder="Graduation Year"
              />
              <Input
                value={school.gpa}
                onChange={(e) => handleInputChange(index, 'gpa', e.target.value)}
                placeholder="GPA"
              />
            </div>
            <Textarea
              value={school.description}
              onChange={(e) => handleInputChange(index, 'description', e.target.value)}
              placeholder="Describe your educational achievements and activities..."
              className="mb-2"
            />
          </CardContent>
        </Card>
      ))}
      
      <Button onClick={addSchool} variant="outline" className="w-full mb-4">+ Add Another School</Button>
      
      <div className="flex justify-between">
        <Button variant="outline">Previous</Button>
        <Button className="bg-red-500 hover:bg-red-600" onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};

export default Education;