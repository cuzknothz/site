"use client";
 
import { useGlobalStore } from "@/store/global-store";
import devfools from "devfools";
import gsap from "gsap";
import {
  Flip,
  ScrambleTextPlugin,
  ScrollSmoother,
  ScrollTrigger,
  SplitText,
} from "gsap/all";
import { ReactNode, useCallback, useEffect } from "react";
 
interface Props {
  children: ReactNode;
}
export default function LayoutEffect({ children }: Props) {
  gsap.registerPlugin(
    Flip,
    ScrambleTextPlugin,
    ScrollTrigger,
    ScrollSmoother,
    SplitText
  );
 
  const setFontReady = useGlobalStore((state) => state.setFontReady);
  const fontReady = useGlobalStore((state) => state.fontReady);
 
  const checkFontReady = useCallback(() => {
    document.fonts.ready.then(() => {
      setFontReady(true);
    });
  }, [setFontReady]);
 
  useEffect(() => {
    checkFontReady();
    devfools("all");
  }, [checkFontReady, setFontReady]);
 
  return (
    <html lang="en" className=" dark:text-[#fff] dark:bg-[#000]">
      <body className="antialiased">
        <div className="sm:w-[500px] w-full mx-auto mt-[100px] mb-[100px] px-[30px] [&>*]:text-[13px] selection:text-[white] selection:bg-[black]">
          {fontReady && children}
        </div>
      </body>
    </html>
  );
}