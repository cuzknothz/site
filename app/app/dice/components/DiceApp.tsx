'use client';
 
import { Box } from '@/components/Util/Box';
import DiceBox from '@3d-dice/dice-box';
import { useEffect, useRef, useState } from 'react';
import DiceIcon from '../dice.svg';
import { Result } from './Result';
import { flatten } from 'lodash';
import { ReRoll } from './ReRoll';
import { useIsMobile } from '@/hooks/useDeviceType';
 
export const DiceApp = () => {
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
        '3d10',
        // '4d12',
        '3d20',
        // '4d100',
      ]);
      return;
    }
    diceBox.current.roll([
      //   '4d4',
      '3d6',
      '3d8',
      '3d10',
      '3d12',
      '3d20',
      '3d100',
    ]);
  };
 
  useEffect(() => {
    diceBox.current = new DiceBox('#dice-box', {
      assetPath: '/assets/dice/',
      scale: 4,
      theme: 'default',
      themeColor: '#303030',
      offscreen: true,
      startingHeight: 50,
    });
 
    diceBox.current.init().then(async () => {
      // diceBox.current.
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
        className='h-full w-full bg-[#ffffff] [&>canvas]:h-full [&>canvas]:w-full'
        id='dice-box'
      ></div>
      <ReRoll onClick={reRoll} className='absolute top-[20px] right-1/2' />
      {showResult && (
        <Result
          result={resultSum}
          className='absolute top-[80px] right-1/2 translate-x-1/2'
        />
      )}
    </div>
  );
};