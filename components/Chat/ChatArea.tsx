'use client';

import AttachImageIcon from '@/assets/svg/ai-attach-image.svg';
import SendIcon from '@/assets/svg/send.svg';
import { toGeminiHistory } from '@/helper/app';
import { useIsMobile } from '@/hooks/useDeviceType';
import { useChatStore } from '@/store/chat';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { Howl } from 'howler';
import { useEffect, useRef, useState } from 'react';
import { Box } from '../Util/Box';
import { TextAreaInput } from './TextAreaInput';
import { DivisionImagePreview, PreviewImage } from './DivisionImagePreview';

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
    URL.revokeObjectURL(url);
  };

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
        <DivisionImagePreview images={images} removeImage={handleRemoveImage} />
        <TextAreaInput
          value={chatInput}
          setValue={setChatInput}
          clickSend={() => sendBtnRef.current!.click()}
        />

        <div className='flex w-full justify-between p-[0px_10px_10px_10px]'>
          <Box
            className='right-2.5 bottom-2.5 flex h-10 cursor-pointer items-center justify-center gap-2.5 px-2.5'
            onClick={handleButtonClick}
          >
            <AttachImageIcon />
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
