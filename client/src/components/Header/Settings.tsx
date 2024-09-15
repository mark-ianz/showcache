import { Separator } from "../ui/separator";
import ThemeSwitch2 from "../ThemeSwitch2";
import LanguageSelect from "../LanguageSelect";
import AccountSettings from "./AccountSettings";

export default function Settings() {
  return (
    <div>
      <p className="text-lg font-semibold">Settings</p>
      <Separator className="my-2" />
      <div className="flex flex-col gap-4">
        <ThemeSwitch2 />
        <LanguageSelect />
        <AccountSettings />
      </div>
    </div>
  );
}
