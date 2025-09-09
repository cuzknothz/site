"use client";
import ArrowUpRightIcon from "@/assets/svg/arrow-up-right.svg";
import { Textz } from "@/components/Util/Tezt";
import Link from "next/link";
 
const link = [
  { platform: "Github", link: "https://github.com/nbcgww" },
  { platform: "Youtube", link: "https://www.youtube.com/@nbcuong" },
];
export default function HomePage() {
  return (
    <div className="flex flex-col gap-[20px]">
      <div>
        <Textz text="Today" bold className="selection:!bg-[#710bf7]" />
        <Textz text="Founder @_, working as a user." />
      </div>
      <div>
        <Textz text="Link" bold className="selection:!bg-[#710bf7]" />
        <div>
          {link.map((i, idx) => (
            <Link
              href={i.link}
              key={idx}
              className="flex items-center"
              target="_blank"
            >
              <Textz text={i.platform} />
              <ArrowUpRightIcon />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}