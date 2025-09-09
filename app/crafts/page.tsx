"use client";
import Spline from "@splinetool/react-spline";

export default function CarftPage() {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center">
      <div className="[&__canvas]:!h-[80vh] relative">
        <Spline scene="https://prod.spline.design/EuSCdtdmk4-yN3ly/scene.splinecode" />
        <div className="absolute bottom-[10px] right-0 w-[200px] h-[50px] bg-[#fff] dark:bg-[#000]"></div>
      </div>
    </div>
  );
}
