import { Auth, createUserWithEmailAndPassword, getAuth } from "firebase/auth"

interface createUserProps {
  auth: Auth;
  email: string;
  password: string;
}

// const auth = getAuth();

export const createUserWithEmailAndPasswordTyped = async ({ auth, email, password }: createUserProps) => {
  return await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // signed in
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      throw new Error(errorMessage);
    });
}

// / 사용 예시
// const auth = getAuth();
// const userProps: createUserProps = {
//   auth: auth,
//   email: "example@example.com",
//   password: "password123"
// };

// createUserWithEmailAndPasswordTyped(userProps)
//   .then((user) => {
//     console.log("User created:", user);
//   })
//   .catch((error) => {
//     console.error("Error creating user:", error);
//   });