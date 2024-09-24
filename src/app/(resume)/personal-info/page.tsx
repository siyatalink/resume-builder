"use client";
import React, { useState } from 'react';
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
    phone: '',
    address: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      setError('No token found. Please log in again.');
      router.push('/');
      return;
    }

    try {
      const response = await fetch('http://localhost:3005/api/savePersonalInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Personal info saved successfully');
        router.push('/work-exp');
      } else {
        const errorData = await response.json();
        console.error('Error saving personal info:', errorData.message);
        setError(errorData.message);
        if (errorData.message === 'Invalid token') {
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
          router.push('/');
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">Personal Information</h1>
      <p className="text-gray-600 mb-6">Enter your basic details to get started.</p>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input 
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              required
            />
          </div>
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