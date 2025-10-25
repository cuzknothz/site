// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';
import { Box } from '../ui/Box';

function TradingViewWidget() {
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
          "hide_legend": false,
          "hide_volume": false,
          "hotlist": false,
          "interval": "5",
          "locale": "en",
          "save_image": true,
          "style": "1",
          "symbol": "BINANCE:ETHUSDT",
          "theme": "light",
          "timezone": "Asia/Bangkok",
          "backgroundColor": "#ffffff",
          "gridColor": "rgba(46, 46, 46, 0.06)",
          "watchlist": [],
          "withdateranges": false,
          "compareSymbols": [],
          "studies": [],
          "autosize": true
        }`;
    container.current!.appendChild(script);
  }, []);

  return (
    <div className='invert dark:invert-0'>
      <Box className='relative h-[400px] overflow-hidden [filter:grayscale(1)_invert(1)_brightness(1.5)] sm:h-[500px] [&__*]:!text-[12px]'>
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

export default memo(TradingViewWidget);
