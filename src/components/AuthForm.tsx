'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/context/AuthContext';

interface AuthFormProps {
  onClose: () => void;
}

export default function AuthForm({ onClose }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'signup' | 'login' | 'complete'>('signup');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const API_URL = "http://localhost:3005/api";  

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null); // Reset error message

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
        setStep('login'); // Move to login after successful signup
      } else {
        setErrorMessage(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Unable to process your request. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null); // Reset error message
  
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
        localStorage.setItem('token', data.token); // Store the token here
        setStep('complete');
      } else if (data.message === 'User not found') {
        setErrorMessage('User is not registered. Please sign up.');
      } else {
        setErrorMessage(data.message || 'Login failed. Incorrect credentials.');
      }
    } catch (error) {
      setErrorMessage('Unable to process your request. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleComplete = () => {
    onClose();
    router.push('/personal-info');
  };

  return (
    <div>
      {step === 'complete' ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Login Successful!</h2>
          <Button onClick={handleComplete} className="bg-red-500 hover:bg-red-700 text-white">
            Continue to Personal Info
          </Button>
        </div>
      ) : (
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

          {/* Error Message */}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          
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
          
          {step === 'login' && !isLoading && (
            <p className="text-center text-gray-600 dark:text-gray-400">
              New user?
              <Button
                variant="link"
                onClick={() => setStep('signup')}
                className="p-0 ml-1 text-blue-600 dark:text-blue-400"
              >
                Sign Up
              </Button>
            </p>
          )}
        </form>
      )}
    </div>
  );
}
