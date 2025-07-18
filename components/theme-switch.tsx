"use client";
import { useTheme } from "next-themes";
import React from "react";
import { Switch } from "./ui/switch";

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Switch
      checked={theme === "dark"}
      onCheckedChange={checked => setTheme(checked ? "dark" : "light")}
    />
  );
};
