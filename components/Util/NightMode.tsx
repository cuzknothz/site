import MoonIcon from "@/assets/svg/moon.svg";
import SunIcon from "@/assets/svg/sun.svg";
 
import { useGlobalStore } from "@/store/global-store";
import { useEffect, useState } from "react";
 
export const NightMode = () => {
  const toggleDarkMode = useGlobalStore((state) => state.toggleDarkMode);
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const htmlElement = document.documentElement;
    toggleDarkMode(htmlElement.classList.contains("dark"));
  }, [toggleDarkMode]);
 
  function toggle() {
    const htmlElement = document.documentElement;
    const isDark = htmlElement.classList.contains("dark");
    htmlElement.classList[isDark ? "remove" : "add"]("dark");
    setIsDark(isDark);
  }
 
  return (
    <div>
      <button onClick={toggle} className="cursor-pointer">
        {isDark ? <MoonIcon /> : <SunIcon />}
      </button>
    </div>
  );
};