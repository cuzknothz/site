import { useEffect, useRef } from 'react';
import { Box } from '../Util/Box';

interface Props {
  interval?: string;
  symbol?: string;
}

export function Chart({ interval = '5', symbol = 'BINANCE:ETHUSDT' }: Props) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
        {
         "allow_symbol_change": true,
  "calendar": false,
  "details": false,
  "hide_side_toolbar": true,
  "hide_top_toolbar": false,
  "hide_legend": true,
  "hide_volume": false,
  "hotlist": false,
  "interval": "${interval}",
  "locale": "en",
  "save_image": false,
  "style": "1",
  "symbol": "${symbol}",
  "theme": "light",
  "timezone": "Asia/Ho_Chi_Minh",
  "backgroundColor": "#ffffff",
  "gridColor": "rgba(255, 255, 255, 0)",
  "watchlist": [],
  "withdateranges": false,
  "compareSymbols": [],
  "studies": [],
  "autosize": true
        }`;
    container.current!.appendChild(script);
  }, []);

  return (
    <div className='h-full invert dark:invert-0'>
      <Box className='relative h-full overflow-hidden filter-[grayscale(1)_invert(1)_brightness(1.5)] **:text-[12px]! sm:rounded-[30px]'>
        <div
          className='tradingview-widget-container h-full w-full overflow-hidden'
          ref={container}
        >
          <div
            className='tradingview-widget-container__widget'
            style={{ height: 'calc(100% - 32px)', width: '100%' }}
          />
        </div>
        <div className='pointer-events-none absolute inset-0 [box-shadow:0_0_0_3px_white_inset]' />
      </Box>
    </div>
  );
}
