import { Button } from "../../ui/button";

export default function AccountSettings() {
  return (
    <div>
      <p className="text-md font-semibold">Account</p>
      <div className="flex flex-col gap-1">
        <Button variant={"outline"} size={"sm"}>
          Login
        </Button>
        <Button variant={"outline"} size={"sm"}>
          Signup
        </Button>
      </div>
    </div>
  );
}
