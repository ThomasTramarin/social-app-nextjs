"use client";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { resolvedTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <p className="text-black dark:text-white">Loading...</p>;
  }

  const handleThemeChange = (value: string) => {
    if (value) {
      setTheme(value);
    }
  };

  return (
    <div className="mt-5">
      <RadioGroup
        value={resolvedTheme || "light"}
        onValueChange={handleThemeChange}
        disabled={theme === "system"}
      >
        <div className="flex items-center gap-2 mb-1">
          <RadioGroupItem value="light" id="light" />
          <Label htmlFor="light">Light Theme</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="dark" id="dark" />
          <Label htmlFor="dark">Dark Theme</Label>
        </div>
      </RadioGroup>

      <div className="flex items-center gap-3 mt-5">
        <Label htmlFor="stytem-mode">
          Do you want to use the device theme?
        </Label>
        <Switch
          id="stytem-mode"
          checked={theme === "system"}
          onCheckedChange={(checked) =>
            setTheme(checked ? "system" : resolvedTheme || "light")
          }
        />
      </div>
    </div>
  );
}
