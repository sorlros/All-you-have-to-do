import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInAnonymously,
} from "firebase/auth";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

// export const SignInWithGoogle = async () => {
//   const provider = new GoogleAuthProvider();
//   const router = useRouter();
//   const auth = getAuth();

//   try {
//     return await signInWithPopup(auth, provider).then(() =>
//       router.push("/schedule"),
//     );
//   } catch (error) {
//     console.error("Error signing in with Google", error);
//   }
// };

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  // const credential = GoogleAuthProvider.credentialFromResult(result);

  try {
    return await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function signOut() {
  const auth = getAuth();

  try {
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}

export async function signInAnonymous() {
  const auth = getAuth();

  try {
    return await signInAnonymously(auth);
  } catch (error) {
    console.error(error);
  }
}
