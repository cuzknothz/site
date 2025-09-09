"use client";
import { useSecretStore } from "@/store/secret-store";
import { BackDrop } from "./Util/BackDrop";
import { InputBlink } from "./Util/InputBlink";
 
export const EnterSecret = () => {
  const isShow = useSecretStore((state) => state.isShow);
  return (
    <>
      {isShow && (
        <BackDrop>
          <div className="w-[300px]  px-[15px] pt-[25px] pb-[15px] rounded-[16px] border-[#00000028] border-[1px]">
            <p className="text-[13px] select-none">
              Enter secret key to view content
            </p>
            <InputBlink />
            <div className="w-full flex justify-between">
              <p>OK</p>
              <p>Cancel</p>
            </div>
          </div>
        </BackDrop>
      )}
    </>
  );
};