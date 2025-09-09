"use client";
 
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";
 
export const InputBlink = () => {
  const slashRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useGSAP(() => {
    const inputWidth = inputRef.current?.clientWidth ?? 0;
    gsap.to(slashRef.current, {
      left: inputWidth + 10,
    //   yoyo: true,
      repeat: -1,
 
    });
  }, []);
  return (
    <div className="h-[35px] relative overflow-hidden">
      <input
        ref={inputRef}
        type="text"
        placeholder="************"
        className="w-full h-full bg-[#92e3fecc] focus:outline-0 px-[10px] rounded-[5px] pt-[5px]"
      />
      <div
        className="w-[50px] h-[100px] absolute rotate-[25deg] bg-[#fff] top-[-100%] left-[-50%]"
        ref={slashRef}
      ></div>
    </div>
  );
};