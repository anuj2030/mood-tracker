import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import AuthForm from "@/components/auth/auth-form";

export default function AuthPage() {
  const { user, isLoading } = useAuth();
  
  // Redirect to home if already logged in
  if (!isLoading && user) {
    return <Redirect to="/" />;
  }
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Form section */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-10 h-10 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h1 className="text-2xl font-heading font-bold">MindfulMe</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Your personal mental health companion</p>
          </div>
          
          <AuthForm />
        </div>
      </div>
      
      {/* Hero section (hidden on mobile) */}
      <div className="hidden md:flex md:w-1/2 bg-primary text-white flex-col justify-center p-10">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-heading font-bold mb-4">Track, understand, and improve your mental wellbeing</h2>
          
          <div className="space-y-4 mt-8">
            <div className="flex items-start gap-3">
              <div className="bg-white/20 rounded-full p-1 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Track Your Mood</h3>
                <p className="text-white/80 text-sm">Log your emotions and see patterns over time with intuitive visualizations</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-white/20 rounded-full p-1 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Journal Your Thoughts</h3>
                <p className="text-white/80 text-sm">Express yourself in a safe, private space and reflect on your feelings</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-white/20 rounded-full p-1 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">AI Companion</h3>
                <p className="text-white/80 text-sm">Talk with a supportive AI companion anytime you're feeling lonely or need support</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-white/20 rounded-full p-1 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Evidence-Based Tools</h3>
                <p className="text-white/80 text-sm">Access therapeutic exercises for stress, anxiety, and improving your mental wellbeing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
