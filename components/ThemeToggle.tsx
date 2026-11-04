"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "booknook-dark";

  return (
    <button
      type="button"
      className="btn btn-ghost btn-circle"
      aria-label="Toggle dark and light theme"
      onClick={() => setTheme(dark ? "booknook-light" : "booknook-dark")}
    >
      {dark ? <FaSun /> : <FaMoon />}
    </button>
  );
}
