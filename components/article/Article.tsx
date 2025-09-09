import { useGSAP } from "@gsap/react";
import { Textz } from "../Util/Tezt";
import { useRef } from "react";
import gsap from "gsap";
 
interface Props {
  title: string;
  contentPreview: string;
}
 
export const Article = ({ title, contentPreview }: Props) => {
  const articleRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.from(articleRef.current, {
      y: "50",
      rotate: "random([-5, 5])",
    });
  }, []);
  return (
    <div ref={articleRef}>
      <div className="w-full cursor-pointer min-h-[70px] rounded-[16px] p-[15px] border-[#00000028] dark:border-[#65656563] border-[1px] duration-500">
        <Textz text={title} bold className="selection:!bg-[#3bafd9]" />
        <Textz text={contentPreview} className="line-clamp-2 dark:selection:bg-[#3bafd9]" delay={200} />
      </div>
    </div>
  );
};