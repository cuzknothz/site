"use client";
import clsx from "clsx";
import { Flip } from "gsap/Flip";
import { gsap } from "gsap";
import {
  MouseEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";

enum SECTION {
  HOME = "Home",
  CRAFT = "Craft",
  WORK = "Work",
  ARTICLE = "Article",
}

const APP_ROUTER = {
  HOME: "/",
  ARTICLE: "/article",
  CRAFT: "/craft",
  WORK: "/work",
};
export const Miracle = () => {
  const [currentSelect, setCurrentSelect] = useState<SECTION>(SECTION.HOME);

  const router = useRouter();

  const changeTo = (to: SECTION, route: string) => () => {
    router.push(route);
    setCurrentSelect(to);
  };
  const getIsSelect = (section: SECTION) => {
    return currentSelect === section;
  };

  return (
    <div className="fixed bottom-[20px] right-1/2 translate-x-1/2 flex gap-[8px]">
      <MiracleButton
        isSelected={getIsSelect(SECTION.HOME)}
        label={SECTION.HOME}
        onClick={changeTo(SECTION.HOME, APP_ROUTER.HOME)}
      >
        <ToiletIcon />
      </MiracleButton>
      <MiracleButton
        isSelected={getIsSelect(SECTION.CRAFT)}
        label={SECTION.CRAFT}
        onClick={changeTo(SECTION.CRAFT, APP_ROUTER.CRAFT)}
      >
        <CraftIcon />
      </MiracleButton>
      <MiracleButton
        isSelected={getIsSelect(SECTION.WORK)}
        label={SECTION.WORK}
        onClick={changeTo(SECTION.WORK, APP_ROUTER.WORK)}
      >
        <WorkIcon />
      </MiracleButton>
      <MiracleButton
        isSelected={getIsSelect(SECTION.ARTICLE)}
        label={SECTION.ARTICLE}
        onClick={changeTo(SECTION.ARTICLE, APP_ROUTER.ARTICLE)}
      >
        <ArticleIcon />
      </MiracleButton>
    </div>
  );
};

interface MiracleButtonProps {
  isSelected: boolean;
  children: ReactNode;
  label: string;
  onClick: MouseEventHandler;
}
export const MiracleButton = ({
  isSelected = false,
  children = <></>,
  label = "",
  onClick,
}: MiracleButtonProps) => {
  const labelRef = useRef<HTMLDivElement>(null);
  const labelText = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const labelState = Flip.getState(labelRef.current);
    labelRef.current!.style.width = isSelected ? "auto" : "0px";
    gsap.to(labelText.current, {
      duration: 1,
      scrambleText: {
        text: label,
        chars: " ",
        revealDelay: 0.5,
        speed: 0.3,
      },
    });
    Flip.from(labelState, { duration: 0.6 });
  }, [isSelected, label]);
  return (
    <div
      onClick={onClick}
      className={clsx(
        "h-[48px] min-w-[48px] rounded-[16px] border-[1px] p-[12px] flex justify-center items-center cursor-pointer",
        isSelected
          ? "bg-[#00000032] border-transparent"
          : "bg-[#00000008] border-[#00000028]"
      )}
    >
      {children}
      <div className="" ref={labelRef}>
        <p
          ref={labelText}
          className="text-[13px] flex justify-center overflow-hidden ml-[8px]"
        >
          {label}
        </p>
      </div>
    </div>
  );
};

const ToiletIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 12h13a1 1 0 0 1 1 1 5 5 0 0 1-5 5h-.598a.5.5 0 0 0-.424.765l1.544 2.47a.5.5 0 0 1-.424.765H5.402a.5.5 0 0 1-.424-.765L7 18"></path>
      <path d="M8 18a5 5 0 0 1-5-5V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8"></path>
    </svg>
  );
};

const CraftIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.531 12.469 6.619 20.38a1 1 0 1 1-3-3l7.912-7.912"></path>
      <path d="M15.686 4.314A12.5 12.5 0 0 0 5.461 2.958 1 1 0 0 0 5.58 4.71a22 22 0 0 1 6.318 3.393"></path>
      <path d="M17.7 3.7a1 1 0 0 0-1.4 0l-4.6 4.6a1 1 0 0 0 0 1.4l2.6 2.6a1 1 0 0 0 1.4 0l4.6-4.6a1 1 0 0 0 0-1.4z"></path>
      <path d="M19.686 8.314a12.501 12.501 0 0 1 1.356 10.225 1 1 0 0 1-1.751-.119 22 22 0 0 0-3.393-6.319"></path>
    </svg>
  );
};

const WorkIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z"></path>
      <path d="M10 21.9V14L2.1 9.1"></path>
      <path d="m10 14 11.9-6.9"></path>
      <path d="M14 19.8v-8.1"></path>
      <path d="M18 17.5V9.4"></path>
    </svg>
  );
};

const ArticleIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
    </svg>
  );
};
