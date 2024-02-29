import { Auth, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

interface signInProps {
  auth: Auth;
  email: string;
  password: string;
}

// const auth = getAuth();
export const signInWithEmailAndPasswordTyped = async ({ auth, email, password }: signInProps) => {
  return await signInWithEmailAndPassword(auth, email, password)
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
