'use client';
import axios from 'axios';
import { get } from 'lodash';
import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Slide } from './Slide';
import { Scrollbar } from '@/components/ScrollBar';

export const MainDivision = () => {
  const [popularArtists, setPopularArtists] = useState([]);
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [popularAblumsAndSingles, setPopularAlbumsAndSingles] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const [
          resPopularArtists,
          resTrendingSongs,
          resPopularAlbumsAndSingles,
        ] = await Promise.all([
          axios.get('/api/spotify/search', {
            params: {
              type: 'artist',
              q: 'trending songs việt',
              market: 'VN',
              limit: 10,
              offset: 5,
            },
          }),
          axios.get('/api/spotify/search', {
            params: {
              type: 'track',
              q: 'trending songs việt',
              market: 'VN',
              limit: 10,
              offset: 5,
            },
          }),
          axios.get('/api/spotify/search', {
            params: {
              type: 'album',
              q: 'trending songs việt',
              market: 'VN',
              limit: 10,
              offset: 5,
            },
          }),
        ]);

        setPopularArtists(get(resPopularArtists, 'data.artists.items', []));
        setTrendingSongs(get(resTrendingSongs, 'data.tracks.items', []));
        setPopularAlbumsAndSingles(
          get(resPopularAlbumsAndSingles, 'data.albums.items', []),
        );
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, []);

  const artist = (artistArr) => artistArr.map((i) => i.name).join(', ');
  return (
    <div className='h-full w-[calc(100vw-350px)] rounded-[20px] bg-[#121212] pt-[4px]'>
      <Scrollbar className='h-full w-[calc(100vw-350px)]'>
        <div className='flex flex-col gap-[20px]'>
          {trendingSongs.length > 0 && (
            <div>
              <div className='flex h-[48px] items-end justify-between px-[100px]'>
                <span className='text-[24px]! font-bold text-white!'>
                  Trending songs
                </span>
                <button className='text-[14px]! font-bold'>Show all</button>
              </div>

              <div className='mt-[15px] flex w-[50%] w-full overflow-hidden px-[85px]'>
                <Slide>
                  {trendingSongs.map((i) => (
                    <div className='embla__slide flex h-[300px] w-[200px] flex-none flex-col items-start'>
                      <img
                        className='aspect-square h-[171px] w-[171px] overflow-hidden rounded-[5px] object-cover select-none'
                        src={get(i, 'album.images[0].url', '')}
                        alt={i.name}
                      />
                      <div className='line-clamp-1 text-white!'>{i.name} </div>
                      <div>{artist(i.artists)}</div>
                    </div>
                  ))}
                </Slide>
              </div>
            </div>
          )}
          {popularArtists.length > 0 && (
            <div>
              <div className='flex h-[48px] items-end justify-between px-[100px]'>
                <span className='text-[24px]! font-bold text-white!'>
                  Popular artists
                </span>
                <button className='text-[14px]! font-bold'>Show all</button>
              </div>

              <div className='mt-[15px] flex w-[50%] w-full px-[85px]'>
                <Slide>
                  {popularArtists.map((i) => (
                    <div className='flex h-[300px] w-[200px] flex-none flex-col items-start'>
                      <img
                        className='aspect-square h-[171px] w-[171px] overflow-hidden rounded-[50%] object-cover select-none'
                        src={get(i, 'images[0].url', '')}
                        alt={i.name}
                      />
                      <div className='line-clamp-1 text-white!'>{i.name} </div>
                      <div>Artist</div>
                    </div>
                  ))}
                </Slide>
              </div>
            </div>
          )}

          {popularAblumsAndSingles.length > 0 && (
            <div>
              <div className='flex h-[48px] items-end justify-between px-[100px]'>
                <span className='text-[24px]! font-bold text-white!'>
                  Popular ablums and singles
                </span>
                <button className='text-[14px]! font-bold'>Show all</button>
              </div>

              <div className='mt-[15px] flex w-[50%] w-full px-[85px]'>
                <Slide>
                  {popularAblumsAndSingles.map((i) => (
                    <div className='flex h-[300px] w-[200px] flex-none flex-col items-start'>
                      <img
                        className='aspect-square h-[171px] w-[171px] overflow-hidden object-cover select-none'
                        src={get(i, 'images[0].url', '')}
                        alt={i.name}
                      />
                      <div className='line-clamp-1 text-white!'>{i.name} </div>
                      <div>{artist(i.artists)}</div>
                    </div>
                  ))}
                </Slide>
              </div>
            </div>
          )}
        </div>
      </Scrollbar>
    </div>
  );
};
