'use client';
import axios from 'axios';
import { get } from 'lodash';
import { useEffect, useState } from 'react';

export const MainDivision = () => {
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
          q: 'trending songs việt',
          market: 'VN',
          limit: 10,
          offset: 5,
        },
      });

      setPopularArtist(get(resPopularArtist, 'data.artists.items', []));

      let resThienHaNgheGi = await axios.get('/api/spotify/search', {
        params: {
          type: 'track',
          q: 'trending songs việt',
          market: 'VN',
          limit: 20,
          offset: 5,
        },
      });
      setThienHaNgheGi(get(resThienHaNgheGi, 'data.tracks.items', []));

      setPopularArtist(get(resPopularArtist, 'data.artists.items', []));

      console.log('resThienHaNgheGi', resThienHaNgheGi);
    };

    getdata();
  }, []);

  const artist = (artistArr) => artistArr.map((i) => i.name).join(', ');
  return (
    <div className='h-full flex-1 rounded-[20px] bg-[#121212] pt-[4px]'>
      <div className='flex flex-col gap-[20px]'>
        {thienHaNgheGi.length > 0 && (
          <div>
            <div className='flex h-[48px] items-end justify-between px-[100px]'>
              <span className='text-[24px]! font-bold text-white!'>
                Trending songs
              </span>
              <span className='text-[14px]! font-bold'>Show all</span>
            </div>

            <div className='mt-[15px] flex w-[50%] overflow-hidden px-[85px]'>
              {thienHaNgheGi.map((i) => (
                <div className='flex h-[300px] w-[200px] flex-none flex-col items-start'>
                  <img
                    className='aspect-square h-[171px] w-[171px] overflow-hidden rounded-[5px] object-cover'
                    src={get(i, 'album.images[0].url', '')}
                    alt={i.name}
                  />
                  <div className='line-clamp-1 text-white!'>{i.name} </div>
                  <div>{artist(i.artists)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {popularArtist.length > 0 && (
          <div>
            <div className='flex h-[48px] items-end justify-between px-[100px]'>
              <span className='text-[24px]! font-bold text-white!'>
                Popular artists
              </span>
              <span className='text-[14px]! font-bold'>Show all</span>
            </div>

            <div className='mt-[15px] flex w-[50%] overflow-hidden px-[85px]'>
              {popularArtist.map((i) => (
                <div className='flex h-[300px] w-[200px] flex-none flex-col items-start'>
                  <img
                    className='aspect-square h-[171px] w-[171px] overflow-hidden rounded-[50%] object-cover'
                    src={get(i, 'images[0].url', '')}
                    alt={i.name}
                  />
                  <div className='line-clamp-1 text-white!'>{i.name} </div>
                  <div>Artist</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// {reverse(popularArtist).map((i) => (
//             <div className='flex flex-none flex-col'>
//               <img
//                 className='h-[100px] w-[100px] overflow-hidden rounded-[50%] object-cover'
//                 src={get(i, 'images[0].url', '')}
//                 alt={i.name}
//               />
//               <div className='line-clamp-1'>{i.name} </div>
//             </div>
//           ))}
