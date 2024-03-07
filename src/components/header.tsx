"use client";

import { Button } from "@/components/ui/button";
import { Auth, onAuthStateChanged } from "firebase/auth";
import {
  signInAnonymous,
  signInWithGoogle,
  signOut,
} from "@/libs/firebase/auth";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { UserInfoProps, createUser } from "@/libs/db/user";
interface HeaderProps {
  auth: Auth;
}

const Header = ({ auth }: HeaderProps) => {
  const [userId, setUserId] = useState(auth?.currentUser?.displayName);
  const [userPhoto, setUserPhoto] = useState<string | null>("");
  const [uid, setUid] = useState<string>("");
  const [userInfo, setUserInfo] = useState<UserInfoProps>({
    displayName: "",
    email: "",
    uid: "",
  });

  const handleAnonymous = async () => {
    await signInAnonymous();
    setUserId("익명의 사용자");
    setUserPhoto("/images/anonymous.png");
  };

  const handleSignInWithGoogle = async () => {
    try {
      const credential = await signInWithGoogle();
      if (credential) {
        const user = credential.user;
        const userInfo = {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
        };
        setUserInfo(userInfo);
        const result = await createUser(userInfo);
        // console.log("result", result);
      }
    } catch (error) {
      console.error(error);
      setUserInfo({
        displayName: "",
        email: "",
        uid: "",
      });
    }
  };

  useEffect(() => {
    // onAuthStateChanged 함수를 사용하여 사용자 인증 상태의 변경을 감지합니다.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 사용자가 로그인한 경우, user 객체를 통해 사용자 정보에 접근할 수 있습니다.
        console.log("user", user);
        // console.log("auth", auth);

        // console.log("auth.currentUser", auth.currentUser);

        setUserId(user.displayName);
        setUid(user.uid);
        setUserPhoto(user.photoURL);
        console.log("로그인 성공");
        // console.log(uid);
      } else {
        // 사용자가 로그아웃한 경우 또는 인증되지 않은 경우
        console.log("User is signed out");
        setUserId(null);
        setUserPhoto(null);
        setUid("");
        setUserInfo({
          displayName: "",
          email: "",
          uid: "",
        });
      }
    });
    // cleanup 함수를 반환하여 컴포넌트가 언마운트될 때 구독을 해제합니다.
    return () => unsubscribe();
  }, [auth]);

  return (
    <div className="w-full h-[50px] flex justify-end items-center gap-2 p-5 pt-10">
      {uid !== "" ? (
        <>
          {userPhoto && (
            <>
              <div className="flex rounded-lg w-[45px] h-[45px] relative">
                <Image
                  src={userPhoto}
                  alt="User"
                  className="w-full h-full object-cover absolute rounded-lg"
                  fill
                  sizes="(min-width: 60em) 24vw, (min-width: 28em) 45vw, 100vw"
                />
              </div>
              <h1>{userId} 님</h1>
            </>
          )}
          <Button onClick={() => signOut()}>로그아웃</Button>
        </>
      ) : (
        <>
          <div className="flex inset-0">
            <FcGoogle size={35} />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSignInWithGoogle()}
            >
              Google로 로그인
            </Button>
          </div>
          <div className="flex inset-0">
            <Image
              src="/images/anonymous.png"
              alt="anonymous"
              width={35}
              height={35}
              sizes="(min-width: 60em) 24vw, (min-width: 28em) 45vw, 100vw"
            />
            <Button variant="ghost" size="sm" onClick={() => handleAnonymous()}>
              익명으로 로그인
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
