'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface JobEntry {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  jobDescription: string;
}

export default function WorkExperience() {
  const router = useRouter();
  const [jobEntries, setJobEntries] = useState<JobEntry[]>([{
    jobTitle: '',
    company: '',
    startDate: '',
    endDate: '',
    jobDescription: ''
  }]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedEntries = [...jobEntries];
    updatedEntries[index] = { ...updatedEntries[index], [name]: value };
    setJobEntries(updatedEntries);
  };

  const addJobEntry = () => {
    setJobEntries([...jobEntries, {
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      jobDescription: ''
    }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Work Experience data:', jobEntries);
    // Here you would typically save the form data
    // Then navigate to the next page
    router.push('/education');
  };

  const handlePrevious = () => {
    router.push('/personal-info');
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">Work Experience</h1>
      <p className="text-gray-600 mb-6">Add your work history to showcase your skills and achievements.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {jobEntries.map((entry, index) => (
          <div key={index} className="space-y-4 p-4 border border-gray-200 rounded-md">
            <div>
              <Label htmlFor={`jobTitle-${index}`}>Job Title</Label>
              <Input 
                id={`jobTitle-${index}`}
                name="jobTitle"
                value={entry.jobTitle}
                onChange={(e) => handleChange(index, e)}
                placeholder="Software Engineer"
                required 
              />
            </div>
            
            <div>
              <Label htmlFor={`company-${index}`}>Company</Label>
              <Input 
                id={`company-${index}`}
                name="company"
                value={entry.company}
                onChange={(e) => handleChange(index, e)}
                placeholder="Acme Inc."
                required 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                <Input 
                  id={`startDate-${index}`}
                  name="startDate"
                  type="date"
                  value={entry.startDate}
                  onChange={(e) => handleChange(index, e)}
                  required 
                />
              </div>
              <div>
                <Label htmlFor={`endDate-${index}`}>End Date</Label>
                <Input 
                  id={`endDate-${index}`}
                  name="endDate"
                  type="date"
                  value={entry.endDate}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor={`jobDescription-${index}`}>Job Description</Label>
              <Textarea 
                id={`jobDescription-${index}`}
                name="jobDescription"
                value={entry.jobDescription}
                onChange={(e) => handleChange(index, e)}
                placeholder="Describe your responsibilities and achievements..."
                rows={4}
              />
            </div>
          </div>
        ))}
        
        <Button 
          type="button" 
          onClick={addJobEntry}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          + Add Another Job
        </Button>
        
        <div className="flex justify-between">
          <Button 
            type="button" 
            onClick={handlePrevious}
            className="bg-gray-500 hover:bg-gray-600 text-white"
          >
            Previous
          </Button>
          <Button type="submit" className="bg-red-500 hover:bg-red-600 text-white">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}