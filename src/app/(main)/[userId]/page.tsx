import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";

const UserPage = () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const router = useRouter();

  if (!currentUser) {
    return router.push("/");
  }

  return <div>ASDASD</div>;
};

export default UserPage;
