'use client';

import TerminalIcon from '@/assets/svg/terminal.svg';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Fragment, useEffect, useRef, useState } from 'react';
import {
  BundledLanguage,
  BundledTheme,
  createHighlighter,
  HighlighterGeneric,
} from 'shiki';

interface Props {
  code: string;
}
export const Code = ({ code = '' }: Props) => {
  const [codeHTML, setCodeHTML] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);

  const codeContainer = useRef<HTMLDivElement>(null);
  const codeBlockRef = useRef<HTMLDivElement>(null);
  const highlighter =
    useRef<HighlighterGeneric<BundledLanguage, BundledTheme>>(null);

  async function loadHighlighter() {
    const highter = await createHighlighter({
      themes: ['vesper'],
      langs: ['typescript'],
    });
    setIsLoaded(true);
    return highter;
  }

  function codeToHTML(code: string) {
    return highlighter.current!.codeToHtml(code, {
      lang: 'typescript',
      theme: 'vesper',
    });
  }
  useEffect(() => {
    const handler = async () => {
      highlighter.current = await loadHighlighter();
      setCodeHTML(codeToHTML(code));
    };

    handler();
  }, [code]);

  function onCopy() {
    const code = codeContainer.current!.querySelector('code')?.innerText;
    if (code) {
      navigator.clipboard.writeText(code).then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 3000);
      });
    }
  }

  useGSAP(() => {
    if (!isLoaded) return;
    const tl = gsap.timeline({});
    tl.from(codeBlockRef.current, {
      height: 0,
    });
    tl.to(codeBlockRef.current, {
      height: '800px !important',
    });
  }, [isLoaded]);

  return (
    <Fragment>
      <div className='relative' ref={codeContainer}>
        <div className='flex h-10 w-full items-center justify-between rounded-t-2xl border border-b-0 border-[#00000000] bg-[#383838] px-[15px] dark:border-[#07cdff] [&__svg]:text-white'>
          <div>
            <TerminalIcon />
          </div>
          <button>
            {isCopied ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M20 6 9 17l-5-5' />
              </svg>
            ) : (
              <svg
                onClick={onCopy}
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M15 2a2 2 0 0 1 1.414.586l4 4A2 2 0 0 1 21 8v7a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z' />
                <path d='M15 2v4a2 2 0 0 0 2 2h4' />
                <path d='M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1' />
              </svg>
            )}
          </button>
        </div>
        {/* <Scrollbar scrollbarWidth={2} style={{ height: 200 }}> */}
        <div
          ref={codeBlockRef}
          className='dsalkjf kljkl duration-500 [&>pre]:rounded-b-2xl [&>pre]:border! [&>pre]:border-[#00000000]! [&>pre]:p-4! [&>pre]:whitespace-break-spaces [&>pre]:dark:border-[#07cdff]!'
          dangerouslySetInnerHTML={{ __html: codeHTML }}
        />
        {/* </Scrollbar> */}
      </div>
    </Fragment>
  );
};
