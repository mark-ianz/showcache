import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type Props = { className?: string };

export default function GoBackButton({ className }: Props) {
  const goBack = () => window.history.back();

  return (
    <div className={cn("mr-4", className)} onClick={goBack}>
      <Button size={"icon"} className="rounded-full z-50 bg-muted-foreground">
        <ArrowLeft className="w-7 h-7 text-background" />
      </Button>
    </div>
  );
}
