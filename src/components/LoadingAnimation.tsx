// @ts-nocheck
import { useTheme } from "@/theme-provider";
import { useEffect, useState } from "react";

type Props = {};

export default function LoadingAnimation({}: Props) {
  return (
    <div className="flex items-center justify-center h-60">
      <div className="w-10 h-10 border-4 border-t-tertiary border-muted rounded-full animate-spin"></div>
    </div>
  );
}
