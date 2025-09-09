import { ReactNode } from "react";
 
interface Props {
  children: ReactNode;
}
export const BackDrop = ({ children }: Props) => {
  return (
    <div className="w-screen h-screen bg-[#ffffff14] z-10 flex justify-center items-center fixed top-0 left-0 backdrop-blur-[2px]">
      {children}
    </div>
  );
};