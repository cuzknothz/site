'use client';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Box } from '../ui/Box';
import clsx from 'clsx';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useGlobalStore } from '@/store/global-store';
import { useChatStore } from '@/store/chat';

export const ChatArea = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sendButtonRef = useRef<HTMLDivElement>(null);
  const pushMess = useChatStore((s) => s.push);

  const [chatInput, setChatInput] = useState<string>('');
  const showFullMenu = useGlobalStore((s) => s.showFullMenu);

  useEffect(() => {
    gsap.to(containerRef.current?.querySelectorAll('svg') ?? [], {
      rotate: showFullMenu ? 360 : 0,
      delay: 1,
    });
  }, [showFullMenu]);

  const onChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setChatInput(e.target.value);
  };

  const handleSend = () => {
    const text = chatInput.trim();
    if (!text) return;

    pushMess({ user: text });
    // TODO: gọi API/chat handler ở đây
    console.log('send:', text);

    setTimeout(() => {
      pushMess({
        bot: 'This feature is under development. This feature is under development. This feature is under development',
      });
    }, 1000);

    if (sendButtonRef.current) {
      gsap.fromTo(
        sendButtonRef.current,
        { scale: 0.9 },
        { scale: 1, duration: 0.15, ease: 'power2.out' },
      );
    }

    setChatInput('');

  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Chặn Enter: nếu chỉ Enter (không kèm Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // không cho xuống dòng
      handleSend(); // nếu chỉ muốn chặn mà KHÔNG gửi, xóa dòng này
    }
  };

  return (
    <div ref={containerRef} className='w-full px-[10px] sm:px-[30px]'>
      <Box className='relative !w-full flex-1 overflow-hidden bg-[#fff] dark:bg-[black]'>
        <textarea
          value={chatInput}
          onChange={onChangeInput}
          onKeyDown={onKeyDown}
          rows={1}
          className='field-sizing-content max-h-[200px] w-full resize-none p-[10px] px-[15px] focus:outline-0'
          placeholder='Ask anything'
        />

        <div className='flex w-full justify-between p-[0px_10px_10px_10px]'>
          <Box className='right-[10px] bottom-[10px] flex h-[40px] w-[40px] items-center justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M5 12h14' />
              <path d='M12 5v14' />
            </svg>
          </Box>

          <div
            ref={sendButtonRef}
            onClick={handleSend}
            role='button'
            aria-label='Send'
          >
            <Box
              shadow
              className={clsx(
                'bottom-[10px] left-[10px] flex h-[40px] w-[40px] cursor-pointer items-center justify-center duration-500',
                chatInput ? 'bg-[#3333335d]' : 'cursor-not-allowed opacity-50',
              )}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='m5 12 7-7 7 7' />
                <path d='M12 19V5' />
              </svg>
            </Box>
          </div>
        </div>
      </Box>
    </div>
  );
};
