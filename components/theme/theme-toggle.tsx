"use client";

import { Moon, Palette, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { usePreferencesStore } from "@/stores/preferences-store";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { sepiaMode, toggleSepia } = usePreferencesStore();
  const isBrowser = typeof window !== "undefined";

  if (!isBrowser) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        className={theme === "light" ? "bg-accent/70" : ""}
        onClick={() => setTheme("light")}
        aria-label="Use light theme"
      >
        <Sun className="h-4 w-4" aria-hidden />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={theme === "dark" ? "bg-accent/70" : ""}
        onClick={() => setTheme("dark")}
        aria-label="Use dark theme"
      >
        <Moon className="h-4 w-4" aria-hidden />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={sepiaMode ? "bg-accent/70" : ""}
        onClick={toggleSepia}
        aria-label="Toggle sepia reading mode"
      >
        <Palette className="h-4 w-4" aria-hidden />
      </Button>
    </div>
  );
}
