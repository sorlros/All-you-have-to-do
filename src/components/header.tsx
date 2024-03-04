"use client";

import { signWithGoogle } from "@/app/api/auth-google-signup";
import { signInWithEmailAndPasswordTyped } from "@/app/api/auth-signin";
import { Button } from "@/components/ui/button";
import { Auth, getAuth, signOut, initializeAuth } from "firebase/auth";
import { getApp } from 'firebase/app';

const Header = () => {
  // const auth = getAuth(app);
  // console.log(auth)
  // console.log(auth.currentUser)
  const auth = getAuth();
  console.log(auth)

  const handleLogout = () => { 
    try {
      signOut(auth);
      console.log(auth.currentUser)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-full h-[50px] flex justify-end gap-2 p-5">
      {/* <Button variant="destructive" size="lg" onClick={() => signWithGoogle()}>
        가입하기
      </Button>
      <Button variant="outline" color="blue" size="lg" className="bg-green" onClick={() => signInWithEmailAndPasswordTyped}>
        로그인
      </Button> */}
      {auth.currentUser === null ? (
        <>
        <Button variant="destructive" size="lg" onClick={() => signWithGoogle()}>
        가입하기
        </Button>
        <Button variant="outline" color="blue" size="lg" className="bg-green" onClick={() => signInWithEmailAndPasswordTyped}>
          로그인
        </Button>
        </>
      ) : (
        <Button onClick={handleLogout}>로그아웃</Button>
      )}
      
    </div>
    
  );
};

export default Header;
