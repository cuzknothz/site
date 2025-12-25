'use client';

import { useIsMobile } from '@/hooks/useDeviceType';
import DiceBox from '@3d-dice/dice-box';
import { useEffect, useRef, useState } from 'react';
import { ReRoll } from './ReRoll';
import { Result } from './Result';
import { useGlobalStore } from '@/store/global';
import clsx from 'clsx';

export const DiceApp = () => {
  const showFullMenu = useGlobalStore((s) => s.showFullMenu);

  const diceBox = useRef<any>(null);
  const divisionRef = useRef<HTMLDivElement>(null);

  const [showResult, setShowResult] = useState(false);
  const [resultSum, setResultSum] = useState([]);
  const { isMobile } = useIsMobile();

  const rollDice = () => {
    setShowResult(false);
    if (!diceBox.current) return;
    diceBox.current.clear();
    if (isMobile) {
      diceBox.current.roll([
        //   '4d4',
        '3d6',
        // '4d8',
        // '3d10',
        // '4d12',
        // '3d20',
        // '4d100',
      ]);
      return;
    }
    diceBox.current.roll([
      //   '4d4',
      '3d6',
      // '3d8',
      // '3d10',
      // '3d12',
      // '3d20',
      // '3d100',
    ]);
  };

  useEffect(() => {
    diceBox.current = new DiceBox('#dice-box', {
      assetPath: '/assets/dice/',
      scale: 4,
      theme: 'default',
      themeColor: '#303030',
      offscreen: true,
      startingHeight: 10,
    });

    diceBox.current.init().then(async () => {
      diceBox.current.onRollComplete = (results) => {
        const allValues = results.flatMap((group) =>
          group.rolls.map((roll) => roll.value),
        );
        setResultSum(allValues);
        setShowResult(true);
      };

      rollDice();
      setTimeout(() => {});
    });
  }, []);
  const reRoll = () => {
    rollDice();
  };
  return (
    <div className='fixed top-0 left-0 h-dvh w-full'>
      <div
        ref={divisionRef}
        className='h-full w-full [&>canvas]:h-full [&>canvas]:w-full'
        id='dice-box'
      ></div>
      <div
        className={clsx(
          'absolute right-1/2 bottom-[50px] translate-x-1/2 duration-500',
          showFullMenu && 'bottom-[120px]!',
        )}
      >
        <ReRoll onClick={reRoll} />
      </div>
      {showResult && (
        <Result
          result={resultSum}
          className='absolute top-[50px] right-1/2 translate-x-1/2'
        />
      )}
    </div>
  );
};
