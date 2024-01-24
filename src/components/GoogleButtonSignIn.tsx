"use client";
import { FC, ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

interface GoogleSignInButtonProps {
  children: ReactNode;
}
const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      await signIn("google", { callbackUrl: "http://localhost:3000/admin" });
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(true);
    }
  };

  return (
    <Button disabled={isLoading} onClick={loginWithGoogle} className="w-full">
      {isLoading && <Loader2 className="animate-spin w-4 h-4" />}
      {children}
    </Button>
  );
};

export default GoogleSignInButton;
