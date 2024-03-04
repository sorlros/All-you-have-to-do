"use client";

import { Button } from "@/components/ui/button";
import { Auth, onAuthStateChanged } from "firebase/auth";
import { signInAnony, signInWithGoogle, signOut } from "@/lib/firebase/auth";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
interface HeaderProps {
  auth: Auth;
}

const Header = ({auth}: HeaderProps) => {
  const [userId, setUserId] = useState(auth?.currentUser?.displayName)
  const [userPhoto, setUserPhoto] = useState<string | null>("")

  const handleAnony = async () => {
    await signInAnony();
    setUserId("익명의 사용자")
    setUserPhoto("/images/anonymous.png")
  }

  useEffect(() => {
    // onAuthStateChanged 함수를 사용하여 사용자 인증 상태의 변경을 감지합니다.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 사용자가 로그인한 경우, user 객체를 통해 사용자 정보에 접근할 수 있습니다.
        console.log("user", user)
        
        setUserId(user.displayName)
        setUserPhoto(user.photoURL)
        console.log(userPhoto)
      } else {
        // 사용자가 로그아웃한 경우 또는 인증되지 않은 경우
        console.log('User is signed out');
        setUserId(null)
        setUserPhoto(null)
      }
    });
    // console.log(auth)
    // console.log(userId)
    // cleanup 함수를 반환하여 컴포넌트가 언마운트될 때 구독을 해제합니다.
    return () => unsubscribe();
  }, []); 

  return (
    <div className="w-full h-[50px] flex justify-end items-center gap-2 p-5 pt-10">
        {userId ? (
          <>
            {userPhoto && 
              <>
                <div className="flex rounded-lg w-[45px] h-[45px] relative">
                  <Image src={userPhoto} alt="User" className="w-full h-full object-cover absolute rounded-lg" fill />
                </div>
                <h1>{userId} 님</h1>
              </>
            }
            <Button onClick={() => signOut()}>로그아웃</Button>
          </>
        ) : (
          <>
            <div className="flex inset-0">
              <FcGoogle size={35} />
              <Button variant="ghost" size="sm" onClick={() => signInWithGoogle()}>
                Google로 로그인
              </Button>
            </div>
            <div className="flex inset-0">
              <Image src="/images/anonymous.png" alt="anonymous" width={35} height={35}/>
              <Button variant="ghost" size="sm" onClick={() => handleAnony()}>
                익명으로 로그인
              </Button>
            </div>
          </>
        )}
    </div>   
  );
};

export default Header;
