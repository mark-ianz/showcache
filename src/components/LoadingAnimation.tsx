// @ts-nocheck
import { useTheme } from "@/theme-provider";
import "ldrs/tailChase";
import { useEffect, useState } from "react";

type Props = {};

export default function LoadingAnimation({}: Props) {
  return (
    <div className="flex items-center justify-center h-60">
      <l-tail-chase
        size="40"
        speed="1.75"
        color="rgb(59 130 246)"
      ></l-tail-chase>
    </div>
  );
}
