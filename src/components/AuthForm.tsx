'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthFormProps {
  onClose: () => void;
}

export default function AuthForm({ onClose }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState('signup');
  const router = useRouter();

  const API_URL = "http://localhost:3005/api";  

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Signed up:', data);
        setStep('login');
      } else {
        console.error('Signup error:', data.message);
      }
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Logged in:', data);
        localStorage.setItem('token', data.token); // Store the token
        sessionStorage.setItem('token', data.token); // Also store in sessionStorage
        setStep('complete');
      } else {
        console.error('Login error:', data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = () => {
    onClose();
    router.push('/personal-info');
  };

  if (step === 'complete') {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Login Successful!</h2>
        <Button onClick={handleComplete} className="bg-red-500 hover:bg-red-700 text-white">
          Continue to Personal Info
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={step === 'signup' ? handleSignup : handleLogin} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        {step === 'signup' ? 'Sign Up' : 'Log In'}
      </h2>
      <div>
        <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-gray-100 dark:bg-gray-700"
          disabled={isLoading}
        />
      </div>
      <div>
        <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-gray-100 dark:bg-gray-700"
          disabled={isLoading}
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-red-500 hover:bg-red-700 text-white"
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : (step === 'signup' ? 'Sign Up' : 'Log In')}
      </Button>
      {step === 'signup' && !isLoading && (
        <p className="text-center text-gray-600 dark:text-gray-400">
          Already have an account?
          <Button
            variant="link"
            onClick={() => setStep('login')}
            className="p-0 ml-1 text-blue-600 dark:text-blue-400"
          >
            Log In
          </Button>
        </p>
      )}
    </form>
  );
}