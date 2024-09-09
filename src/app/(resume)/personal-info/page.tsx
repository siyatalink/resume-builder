'use client';

import React , { useState }from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function PersonalInfo() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Here you would typically save the form data
    // Then navigate to the next page
    router.push('/work-exp');
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">Personal Information</h1>
      <p className="text-gray-600 mb-6">Enter your basic details to get started.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-col-2 gap-4">
          <div>
            <Label htmlFor="firstName">
              First Name
            </Label>
            <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="siya"
            required
            ></Input>
          </div>
          <div>
            <Label htmlFor="lastName">Last name</Label>
            <Input 
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Digra"
            required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="siya@gmail.com"
          required
           />
        </div>
        <div>
        <Label htmlFor="phone">Phone</Label>
          <Input 
            id="phone" 
            name="phone"
            type="tel" 
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 555-5555" 
          />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Textarea 
            id="address" 
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="123 Main St, Anytown USA" 
            rows={3}
          />
        </div>
        <Button type="submit" className="bg-red-500 hover:bg-red-600 text-white">
          Next
        </Button>
      </form>
    </div>
  );
}