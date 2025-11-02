import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import { Scrollbar } from '../ScrollBar';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface Props {
  value: string;
  setValue: (val: string) => void;
  clickSend: () => void;
}

export const TextAreaInput = ({ value, setValue, clickSend }: Props) => {

  const textAreaInputRef = useRef<HTMLTextAreaElement>(null);
  const fakeSpanRef = useRef<HTMLSpanElement>(null);

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
      clickSend();
      //   sendBtnRef.current!.click();
    }
  };

  useGSAP(() => {
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
  return (
    <>
      <Scrollbar className='max-h-[200px]' autoHide={true}>
        <textarea
          ref={textAreaInputRef}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onKeyDown={onKeyDown}
          onCompositionStart={onCompositionStart}
          onCompositionEnd={onCompositionEnd}
          rows={1}
          className='field-sizing-content w-full resize-none p-2.5 px-[15px] caret-violet-500 focus:outline-0'
          placeholder='Ask anything'
        />
        <span ref={fakeSpanRef} className='hidden' />
      </Scrollbar>
    </>
  );
};
