import { signWithGoogle } from "@/app/api/auth-google-signup";
import { signInWithEmailAndPasswordTyped } from "@/app/api/auth-signin";
import { Button } from "@/components/ui/button";
import { Auth, getAuth, signOut } from "firebase/auth";

const Header = () => {
  return (
    <div className="w-full h-[50px] flex justify-end gap-2 p-5">
      <Button variant="destructive" size="lg" onClick={() => signWithGoogle()}>
        Sign Up
      </Button>
      <Button variant="outline" color="blue" size="lg" className="bg-green" onClick={() => signInWithEmailAndPasswordTyped}>
        Sign in
      </Button>
      <Button onClick={() => {}}>Sign out</Button>
    </div>
    
  );
};

export default Header;
