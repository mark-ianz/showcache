import { Separator } from "@/components/ui/separator";
import ThemeSwitch from "./ThemeSwitch";
import LanguageSelect from "./LanguageSelect";
import AccountSettings from "./AccountSettings";

export default function Settings() {
  return (
    <div>
      <p className="text-lg font-semibold">Settings</p>
      <Separator className="my-2" />
      <div className="flex flex-col gap-4">
        <ThemeSwitch />
        <LanguageSelect />
        <AccountSettings />
      </div>
    </div>
  );
}
