import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type ThemeMode = "dark" | "light";

const storageKey = "esthien-theme";

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "dark";
  }

  try {
    const stored = window.localStorage.getItem(storageKey);
    if (stored === "dark" || stored === "light") {
      return stored;
    }
  } catch {
    return "dark";
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const nextTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;

    try {
      window.localStorage.setItem(storageKey, theme);
    } catch {
      // Theme still works for the current page when storage is unavailable.
    }

    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    themeColor?.setAttribute("content", theme === "dark" ? "#050608" : "#f8faf9");
  }, [theme]);

  return (
    <button
      className="icon-button theme-toggle"
      type="button"
      aria-label={`Switch to ${nextTheme} mode`}
      aria-pressed={theme === "light"}
      title={`Switch to ${nextTheme} mode`}
      onClick={() => setTheme(nextTheme)}
    >
      {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  );
}
