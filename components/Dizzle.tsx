"use client";
import RabbitIcon from "@/assets/svg/rabbit.svg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { NightMode } from "./Util/NightMode";
 
export const Dizzle = () => {
  const headerRef = useRef<HTMLDivElement>(null);
 
  useGSAP(() => {
    gsap.from(headerRef.current, {
      top: "-50px",
    });
  }, []);
 
  return (
    <header
      ref={headerRef}
      className="h-[80px] z-10 top-0 fixed w-[100vw] sm:w-[500px] pt-[30px] px-[30px] backdrop-blur-[5px] flex justify-between  items-center right-1/2 translate-x-1/2"
    >
      {/* <SunIcon /> */}
      <RabbitIcon />
      <div>
        <NightMode/>
      </div>
    </header>
  );
};