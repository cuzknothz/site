'use client';
import SpotifyIcon from '@/assets/svg/spotify.svg';
import { BackDrop } from '@/components/Util/BackDrop';
import { Box } from '@/components/Util/Box';
import { useInitApp } from '@/hooks/useInitApp';
import { useEffect, useRef, useState } from 'react';
import { Avatar } from './Avatar';
import { Note } from './Note';
import axios from 'axios';
import { get, reverse } from 'lodash';
import { Scrollbar } from '@/components/ScrollBar';

const LoginWith = () => {
  return (
    <BackDrop>
      <Box className='w-[300px] p-2.5'>
        <div className='flex flex-col items-center'>
          <Avatar className='w-[50px]' />
          <p>nbacuong</p>
        </div>
        <Box className='mt-5 bg-[#92d7f7] p-[5px] text-center'>
          Login with your Spotify account instead
        </Box>
        <p className='mt-[5px] text-[11px] text-red-500'>
          * Cần tài khoản Spotify Premium mới có thể play được nhạc
        </p>
      </Box>
    </BackDrop>
  );
};

export const SpotifyApp = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showNote, setShowNote] = useState(false);

  const [newRelease, setNewRelease] = useState([]);

  const [categories, setCategories] = useState([]);
  const [hotArtistsTopTracks, setHotArtistsTopTracks] = useState({});

  const { initPending } = useInitApp(() => {
    setShowNote(true);
  });

  const [popularArtist, setPopularArtist] = useState([]);

  const [thienHaNgheGi, setThienHaNgheGi] = useState([]);

  useEffect(() => {
    const getdata = async () => {
      let res = await axios.get('/api/spotify/home');
      console.log('token', res);
      // return token;

      let resPopularArtist = await axios.get('/api/spotify/search', {
        params: {
          type: 'artist',
          // q: 'nghệ sĩ việt nổi bật',
          // q: 'trending nghệ sĩ việt',
          q: 'nghệ sĩ trending ',
          market: 'VN',
          limit: 50,
        },
      });

      setPopularArtist(get(resPopularArtist, 'data.artists.items', []));

      let resThienHaNgheGi = await axios.get('/api/spotify/search', {
        params: {
          type: 'track',
          // q: 'nghệ sĩ việt nổi bật',
          // q: 'trending nghệ sĩ việt',
          q: 'trending bài hát',
          market: 'VN',
          limit: 50,
        },
      });
      setThienHaNgheGi(get(resThienHaNgheGi, 'data.tracks.items', []));

      setPopularArtist(get(resPopularArtist, 'data.artists.items', []));

      console.log('resThienHaNgheGi', resThienHaNgheGi);
    };

    getdata();
  }, []);

  return (
    <div
      ref={containerRef}
      className='fixed top-0 left-0 h-dvh w-screen overflow-scroll'
    >
      {initPending && (
        <BackDrop>
          <SpotifyIcon className='h-[180px] w-[180px] -translate-y-[50px]' />
        </BackDrop>
      )}
      {showNote && (
        <BackDrop>
          <Note setShowNote={setShowNote} />
        </BackDrop>
      )}

      <div>
        <div>Popular Artist</div>
        <div>
          <div className='flex flex-wrap gap-[5px]'>
            {reverse(popularArtist).map((i) => (
              <div className='flex flex-none flex-col'>
                <img
                  className='h-[100px] w-[100px] overflow-hidden rounded-[50%] object-cover'
                  src={get(i, 'images[0].url', '')}
                  alt={i.name}
                />
                <div className='line-clamp-1'>{i.name} </div>
              </div>
            ))}
          </div>
          <div></div>
        </div>
      </div>
      <div>
        <div className='text-[15px] font-bold'>Thiên hạ nghe gì</div>
        <div>
          <div className='flex flex-col gap-[5px]'>
            {thienHaNgheGi.map((i) => (
              <div className='flex flex-none items-center'>
                <img
                  className='aspect-square h-[40px] w-[40px] overflow-hidden rounded-[5px] object-cover'
                  src={get(i, 'album.images[0].url', '')}
                  alt={i.name}
                />
                <div className='line-clamp-1'>{i.name} </div>
              </div>
            ))}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
