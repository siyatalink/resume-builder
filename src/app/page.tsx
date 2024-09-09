"use client";
import { useState } from 'react';
import Image from "next/image";
import LottieAnimation from "../components/LottieAnimation";
import { Button } from "@/components/ui/button";
import AuthForm from '../components/AuthForm';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Create Your Perfect Resume</h1>
      <p className="text-xl">
        Our AI-powered resume builder helps you craft a professional resume in minutes.
      </p>
      <LottieAnimation />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="default" size="lg" className="mt-8 bg-red-500 hover:bg-red-700" onClick={() => setIsOpen(true)}>
            Get Started
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white dark:bg-gray-800">
          <AuthForm onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </main>
  );
}