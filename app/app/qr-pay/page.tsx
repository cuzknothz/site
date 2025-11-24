'use client';
import QRIcon from '@/assets/svg/qr.svg';
import SaveIcon from '@/assets/svg/save.svg';
import { Scrollbar } from '@/components/ScrollBar';
import { BackDrop } from '@/components/Util/BackDrop';
import { Box } from '@/components/Util/Box';
import { TextScramble } from '@/components/Util/TextScramble';
import { useEffectNext } from '@/hooks/useEffectNext';
import { useHiddenMenuNext } from '@/hooks/useHiddenMenuNext';
import { useInitApp } from '@/hooks/useInitApp';
import clsx from 'clsx';
import QRCodeStyling from 'qr-code-styling';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { Bank, BanksObject, QRPay } from 'vietnam-qr-pay';

const AUTHOR_PAY = {
  bankBin: BanksObject.tpbank.bin,
  bankNumber: '98925698888',
};

const qrCode = new QRCodeStyling({
  width: 500,
  height: 500,
  dotsOptions: {
    color: '#000',
    type: 'rounded',
  },
  cornersSquareOptions: {
    type: 'extra-rounded',
    color: '#000',
  },
  imageOptions: {
    crossOrigin: 'anonymous',
    margin: 20,
  },
});

const MAX_STK_LENGTH = 16;
const MAX_LOI_NHAN_LENGTH = 35;

const formatAmount = (value: string) => {
  if (!value) return '';
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const removeVietnameseTones = (str: string) => {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};

export default function QRGeneratorPage() {
  const [nganHang, setNganHang] = useState(BanksObject.tpbank);
  const [stk, setStk] = useState('');
  const [soTien, setSoTien] = useState('');
  const [loiNhan, setLoiNhan] = useState('');

  const [showListNH, setShowListNH] = useState(false);

  const [initQRFirstTime, setInitQRFirstTime] = useState(true);

  const qrPayRef = useRef<QRPay | null>(null);
  const refEl = useRef<HTMLDivElement>(null);

  useHiddenMenuNext();
  // init
  useEffect(() => {
    if (!refEl.current) return;
    qrCode.append(refEl.current);
    qrPayRef.current = QRPay.initVietQR(AUTHOR_PAY);
    const content = qrPayRef.current.build();
    qrCode.update({ data: content });
  }, []);

  function onDownloadClick() {
    qrCode.download({ extension: 'png' });
  }

  function onChangeStk(e: ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    const digitsOnly = raw.replace(/\D/g, '').slice(0, MAX_STK_LENGTH);

    setStk(digitsOnly);

    if (!digitsOnly) {
      return;
    }
  }

  function onChangeSoTien(e: ChangeEvent<HTMLInputElement>) {
    let rawInput = e.target.value;
    rawInput = rawInput.replace(/,/g, '').replace(/\D/g, '');
    if (!/^\d*$/.test(rawInput)) return;
    setSoTien(rawInput);
  }

  function onChangeLoiNhan(e: ChangeEvent<HTMLTextAreaElement>) {
    let value = e.target.value;
    value = removeVietnameseTones(value);
    value = value.replace(/[^a-zA-Z0-9 ]/g, '');
    value = value.slice(0, MAX_LOI_NHAN_LENGTH);
    setLoiNhan(value);
  }

  function onSetNganHang(nganHang: Bank) {
    setNganHang(nganHang);
    setShowListNH(false);
  }

  useEffectNext(() => {
    setInitQRFirstTime(false);
    if (!stk) {
      qrCode.update({ data: '' });
      return;
    }
    const payload: any = {
      bankBin: nganHang.bin,
      bankNumber: stk,
    };

    if (soTien) {
      payload.amount = soTien;
    }

    if (loiNhan) {
      payload.purpose = loiNhan;
    }

    qrPayRef.current = QRPay.initVietQR(payload);
    console.log('payload', payload);
    const content = qrPayRef.current.build();
    qrCode.update({ data: content });
  }, [nganHang, soTien, stk, loiNhan]);

  const listNHRef = useRef<HTMLDivElement>(null);
  useClickAway(listNHRef, () => setShowListNH(false));

  const { initPending } = useInitApp(() => {}, 500);

  return (
    <>
      {initPending && (
        <BackDrop>
          <QRIcon className='h-[180px] w-[180px] -translate-y-[50px]' />
        </BackDrop>
      )}
      <div className='flex flex-col items-center gap-2.5'>
        <div className='flex w-full flex-col gap-[5px]'>
          <div className='flex h-5 gap-[5px]'>
            <TextScramble text='Ngân Hàng' bold />
            <p className='text-red-500'>(*)</p>
          </div>

          <Box className='relative flex h-10 w-full items-center rounded-[10px]! px-2.5'>
            <button
              className='flex h-full w-full cursor-pointer items-center'
              onClick={() => setShowListNH(true)}
            >
              {nganHang?.shortName ?? ''}
            </button>
            {showListNH && (
              <div ref={listNHRef}>
                <Box className='absolute top-10 left-0 z-10 w-full overflow-hidden rounded-[10px]! bg-white!'>
                  <Scrollbar className='max-h-[350px]'>
                    {Object.values(BanksObject).map((i) => (
                      <div
                        key={i.bin}
                        onClick={() => onSetNganHang(i)}
                        className='flex h-[35px] cursor-pointer items-center rounded-[10px]! px-5 hover:bg-[#bbff00]'
                      >
                        {i.shortName}
                      </div>
                    ))}
                  </Scrollbar>
                </Box>
              </div>
            )}
          </Box>
        </div>

        <div className='flex w-full flex-col gap-[5px]'>
          <div className='flex h-5 gap-[5px]'>
            <TextScramble text='STK' bold />
            <p className='text-red-500'>(*)</p>
          </div>

          <Box className='h-10 w-full overflow-hidden rounded-[10px]!'>
            <input
              value={stk}
              onChange={onChangeStk}
              placeholder={AUTHOR_PAY.bankNumber}
              type='text'
              maxLength={MAX_STK_LENGTH}
              inputMode='numeric'
              className='h-full w-full [appearance:textfield] px-2.5 focus:outline-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
            />
          </Box>
        </div>

        <div className='flex w-full flex-col gap-[5px]'>
          <TextScramble text='Số Tiền' bold className='h-5' />
          <Box className='relative h-10 w-full overflow-hidden rounded-[10px]!'>
            <input
              value={formatAmount(soTien)}
              onChange={onChangeSoTien}
              className='h-full w-full [appearance:textfield] px-2.5 pr-12 focus:outline-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
              type='text'
              inputMode='numeric'
            />
            <span className='pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-sm text-gray-500'>
              VND
            </span>
          </Box>
        </div>

        {soTien && (
          <div className='flex w-full flex-col gap-[5px]'>
            <TextScramble text='Nội Dung Chuyển Tiền' bold className='h-5' />
            <Box className='relative w-full overflow-hidden rounded-[10px]!'>
              <textarea
                value={loiNhan}
                onChange={onChangeLoiNhan}
                maxLength={MAX_LOI_NHAN_LENGTH}
                className='h-10 w-full [appearance:textfield] px-2.5 pr-12 focus:outline-0'
              />
            </Box>
          </div>
        )}

        <div
          className={clsx(
            'mt-[15px] aspect-square w-full [&>canvas]:h-full! [&>canvas]:w-full!',
            initQRFirstTime && 'opacity-20',
          )}
          ref={refEl}
        />

        {stk && (
          <Box
            onClick={onDownloadClick}
            className='flex h-10 w-full cursor-pointer items-center justify-center gap-[5px] rounded-[15px]! bg-[#95ff0a] px-[50px]'
          >
            <SaveIcon />
            <p>Lưu QR</p>
          </Box>
        )}
      </div>
    </>
  );
}
