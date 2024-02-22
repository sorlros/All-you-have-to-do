import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <div className="w-full h-[50px] flex justify-end gap-2 p-5">
      <Button variant="destructive" size="lg">
        Sign Up
      </Button>
      <Button variant="outline" color="blue" size="lg" className="bg-green">
        Sign in
      </Button>
    </div>
  );
};

export default Header;
