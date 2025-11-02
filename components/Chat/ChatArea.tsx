'use client';
import SendIcon from '@/assets/svg/send.svg';
import { toGeminiHistory } from '@/helper/app';
import { useIsMobile } from '@/hooks/useDeviceType';
import { useChatStore } from '@/store/chat';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { Howl } from 'howler';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Scrollbar } from '../ScrollBar';
import { Box } from '../Util/Box';

interface PreviewImage {
  file: File;
  url: string;
}
export const ChatArea = () => {
  const { isMobile } = useIsMobile();
  const [pending, setPending] = useState(false);

  const soundSend = useRef<Howl>(null);

  useEffect(() => {
    soundSend.current = new Howl({
      src: ['/message-send.mp3'],
    });
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const sendBtnRef = useRef<HTMLButtonElement>(null);

  const [chatInput, setChatInput] = useState<string>('');

  const onChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setChatInput(e.target.value);
  };

  const { contextSafe } = useGSAP(() => {}, { scope: containerRef });

  const animationBtnSendAndDivision = contextSafe(() => {
    gsap.fromTo(
      containerRef.current,
      {
        scale: isMobile ? 0.7 : 0.9,
      },
      { scale: 1, duration: 0.3, ease: 'bounce.out' },
    );
    gsap.fromTo(
      '.z-send-btn',
      { scale: 0.1 },
      { scale: 1, duration: 0.3, ease: 'power2.out' },
    );
  });

  const conversations = useChatStore((_) => _.conversations);
  const ensureCurrent = useChatStore((_) => _.ensureCurrent);

  const appendMessage = useChatStore((_) => _.appendMessage);

  const updateMessage = useChatStore((_) => _.updateMessage);

  const justSentId = useChatStore((_) => _.justSentId);
  const setJustSentId = useChatStore((_) => _.setJustSentId);
  const setThinking = useChatStore((_) => _.setThinking);

  const handleSend = async () => {
    const text = chatInput.trim();
    if (!text) return;
    soundSend.current?.play();
    setChatInput('');
    animationBtnSendAndDivision();

    const convId = ensureCurrent();

    const prevMessages = conversations[convId]?.messages ?? [];
    const historyPayload = toGeminiHistory(prevMessages);

    const userMsgId = crypto.randomUUID();

    appendMessage(convId, { id: userMsgId, role: 'user', content: text });
    setJustSentId(userMsgId);

    const modelMsgId = crypto.randomUUID();
    appendMessage(convId, { id: modelMsgId, role: 'model', content: '' });

    setPending(true);
    setThinking(true);
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: historyPayload, userMessage: text }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      if (!res.body) throw new Error('No response body');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let modelReply = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line.startsWith('data:'));

        for (const line of lines) {
          const data = line.replace(/^data:\s*/, '');
          if (data === '[DONE]') {
            setPending(false);
            setTimeout(() => setJustSentId(null), 200);
            return;
          }

          try {
            const json = JSON.parse(data) as { text?: string };
            if (json.text) {
              setThinking(false);
              modelReply += json.text;
              updateMessage(convId, modelMsgId, { content: modelReply });
            }
          } catch (err) {
            console.error('Stream JSON parse error:', err);
          }
        }
      }
    } catch (err) {
      console.error('Chat stream error:', err);
    } finally {
      setPending(false);
      setThinking(false);
    }
  };

  const isComposing = useRef(false);

  const onCompositionStart = () => {
    isComposing.current = true;
  };

  const onCompositionEnd = () => {
    isComposing.current = false;
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing.current) {
      e.preventDefault();
      sendBtnRef.current!.click();
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<PreviewImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const handleImageFiles = (files: FileList | File[]) => {
    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith('image/'),
    );
    const newImages: PreviewImage[] = imageFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleImageFiles(e.target.files);
      e.target.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleImageFiles(e.dataTransfer.files);
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemoveImage = (url: string) => {
    setImages((prev) => prev.filter((img) => img.url !== url));
    URL.revokeObjectURL(url); // Giải phóng bộ nhớ
  };

  const fakeSpanRef = useRef<HTMLSpanElement>(null);
  const textAreaInputRef = useRef<HTMLTextAreaElement>(null);

  const animationPlaceHolder = contextSafe(() => {
    const textTarget = 'Ask Anything :)';
    gsap.to(fakeSpanRef.current, {
      duration: 1,
      scrambleText: {
        text: textTarget,
        chars: '!@#$%^&*()_+',
        revealDelay: 0.5,
        speed: 0.3,
        delimiter: '',
        rightToLeft: false,
      },
      repeat: -1,
      repeatDelay: 5,
      onUpdate: () => {
        textAreaInputRef.current!.placeholder =
          fakeSpanRef.current!.textContent || '';
      },
      onComplete: () => {
        textAreaInputRef.current!.placeholder = textTarget;
      },
    });
  });

  useGSAP(() => {
    animationPlaceHolder();
  });

  return (
    <div
      ref={containerRef}
      className='w-full px-2.5 sm:px-[30px]'
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
    >
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handleFileChange}
      />
      <Box
        className={clsx(
          'relative w-full! flex-1 overflow-hidden bg-[#ffffff62] backdrop-blur-[2px] dark:bg-[black]',
        )}
      >
        <div
          className={clsx(
            'flex gap-2.5 overflow-x-auto',
            images.length && 'p-[15px]',
          )}
        >
          {images.map((img, idx) => (
            <Box
              key={img.url}
              className='relative flex-none overflow-hidden rounded-[20px]'
            >
              <img
                src={img.url}
                alt={`preview-${idx}`}
                className='aspect-square! h-[65px]! w-[65px]! object-cover'
              />
              <button
                style={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  background: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  width: 24,
                  height: 24,
                  padding: 0,
                  textAlign: 'center',
                }}
                onClick={() => handleRemoveImage(img.url)}
                title='Xoá ảnh'
              >
                &times;
              </button>
            </Box>
          ))}
        </div>
        <Scrollbar className='max-h-[200px]' autoHide={true}>
          <textarea
            ref={textAreaInputRef}
            value={chatInput}
            onChange={onChangeInput}
            onKeyDown={onKeyDown}
            onCompositionStart={onCompositionStart}
            onCompositionEnd={onCompositionEnd}
            rows={1}
            className='field-sizing-content w-full resize-none p-2.5 px-[15px] caret-violet-500 focus:outline-0'
            placeholder='Ask anything'
          />
          <span ref={fakeSpanRef} className='hidden' />
        </Scrollbar>

        <div className='flex w-full justify-between p-[0px_10px_10px_10px]'>
          <Box
            className='right-2.5 bottom-2.5 flex h-[40px] cursor-pointer items-center justify-center gap-2.5 px-2.5'
            onClick={handleButtonClick}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              role='img'
              color='#000000'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M12.0653 1.75H12.0653C13.3792 1.74999 14.5169 1.74998 15.5 1.79286V4H14.25C13.0074 4 12 5.00736 12 6.25C12 7.49264 13.0074 8.5 14.25 8.5H15.5V9.75C15.5 10.9926 16.5074 12 17.75 12C18.9926 12 20 10.9926 20 9.75V8.5H22.2056C22.25 9.52969 22.25 10.7359 22.25 12.0653C22.25 14.0744 22.25 15.6717 22.0967 16.934C21.9389 18.2327 21.6065 19.3071 20.8467 20.1968C20.6474 20.4301 20.4301 20.6474 20.1968 20.8467C19.3071 21.6065 18.2327 21.9389 16.934 22.0967C15.6717 22.25 13.9439 22.25 11.9347 22.25C9.92558 22.25 8.3283 22.25 7.06598 22.0967C5.76729 21.9389 4.69294 21.6065 3.80323 20.8467C3.56991 20.6474 3.35261 20.4301 3.15334 20.1968C2.39346 19.3071 2.06106 18.2327 1.90331 16.934C1.74997 15.6717 1.74998 14.0744 1.75 12.0652V12.0652C1.74998 10.0561 1.74997 8.3283 1.90331 7.06598C2.06106 5.76729 2.39346 4.69294 3.15334 3.80323C3.35261 3.56991 3.56991 3.35261 3.80323 3.15334C4.69294 2.39346 5.76729 2.06106 7.06598 1.90331C8.3283 1.74997 10.0561 1.74998 12.0653 1.75ZM4.63803 18.9288C4.22847 18.4493 3.97614 17.8067 3.84153 16.6986C3.78993 16.2738 3.75747 15.7999 3.73706 15.263L7.46976 11.5303C7.80933 11.1908 8.26988 11 8.75009 11C9.23031 11 9.69086 11.1908 10.0304 11.5303L14.0001 15.5L15.9698 13.5303C16.3093 13.1908 16.7699 13 17.2501 13C17.7303 13 18.1909 13.1908 18.5304 13.5303L20.2631 15.263C20.2427 15.7999 20.2103 16.2738 20.1587 16.6986C20.024 17.8067 19.7717 18.4493 19.3622 18.9288C19.2293 19.0843 19.0844 19.2292 18.9289 19.3621C18.4493 19.7716 17.8068 20.024 16.6987 20.1586C15.5678 20.2959 14.0892 20.2976 12.0001 20.2976C9.91094 20.2976 8.43237 20.2959 7.3015 20.1586C6.19337 20.024 5.55083 19.7716 5.0713 19.3621C4.91575 19.2292 4.77088 19.0843 4.63803 18.9288Z'
                fill='#000000'
              ></path>
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M17.75 1.75C18.3023 1.75 18.75 2.19772 18.75 2.75V5.25H21.25C21.8023 5.25 22.25 5.69772 22.25 6.25C22.25 6.80228 21.8023 7.25 21.25 7.25H18.75V9.75C18.75 10.3023 18.3023 10.75 17.75 10.75C17.1977 10.75 16.75 10.3023 16.75 9.75V7.25H14.25C13.6977 7.25 13.25 6.80228 13.25 6.25C13.25 5.69772 13.6977 5.25 14.25 5.25H16.75V2.75C16.75 2.19772 17.1977 1.75 17.75 1.75Z'
                fill='#000000'
              ></path>
            </svg>
            {/* <input type="file" accept=''/> */}
            <div>Attach Image</div>
          </Box>

          <button
            onClick={handleSend}
            role='button'
            aria-label='Send'
            className={clsx(
              'z-send-btn',
              'cursor-pointer disabled:cursor-cell disabled:[&>div]:opacity-50',
            )}
            ref={sendBtnRef}
            disabled={pending}
          >
            <Box
              shadow
              className={clsx(
                'bottom-2.5 left-2.5 flex h-10 w-10 items-center justify-center duration-500',
                chatInput.trim() || images.length
                  ? 'bg-[#00eeff5d]'
                  : 'cursor-not-allowed opacity-100',
              )}
            >
              <SendIcon />
            </Box>
          </button>
        </div>
      </Box>
    </div>
  );
};
