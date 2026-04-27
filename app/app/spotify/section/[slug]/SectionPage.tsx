'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

interface Props {
  slug: string;
}

export const SectionPage = ({ slug }: Props) => {
  const [sectionState, setSectionState] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const objMap = {
          ['trending-songs']: 'track',
          ['popular-artists']: 'artist',
          ['popular-ablums-and-singles']: 'album',
        };

        const res = await axios.get('/api/spotify/search', {
          params: {
            type: objMap[slug as keyof typeof objMap],
            q: 'trending songs việt',
            market: 'VN',
            limit: 20,
            offset: 5,
          },
        });

        console.log('res', res);
        console.log('DSAKJHFJKHGFDKJHFKJDFHKJDFHJK');
      } catch (e) {}

      getData();
    };
  }, []);
  return <div>asdfsdf</div>;
};
