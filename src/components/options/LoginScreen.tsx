import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Lock } from "lucide-react";

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 2000);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center p-4 bg-[#F5F5F5] dark:bg-[#0F0F0F] transition-colors">
      <div className="max-w-md w-full">
        <Card className="p-8 text-center bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded-2xl shadow-sm">
          <div className="mb-6">
            <div className="p-4 rounded-full bg-black dark:bg-white inline-block mb-4">
              <Shield className="w-8 h-8 text-white dark:text-black" />
            </div>
            <h1 className="text-3xl font-bold text-black dark:text-white mb-2 tracking-tight">AuthKey</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              A simple extension to manage your privacy
            </p>
          </div>

          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] flex items-center justify-center">
              <Lock className="w-16 h-16 text-black dark:text-white" />
            </div>
            <h2 className="text-xl font-semibold text-black dark:text-white mb-2">
              Set up your passcode to use AuthKey
            </h2>
          </div>

          <Button
            onClick={handleRegister}
            disabled={isLoading}
            className="w-full py-3 bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100 text-white dark:text-black font-medium rounded-xl transition-all"
          >
            {isLoading ? "Setting up..." : "Set up passcode"}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default LoginScreen;
