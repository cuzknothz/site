'use client';
import { Map, Marker } from 'pigeon-maps';
import { Box } from './Util/Box';

interface Props {
  lat: number;
  lon: number;
}

export const MapPigeon = ({ lat, lon }: Props) => {
  return (
    <Box className='h-[150px] overflow-hidden'>
      <Map height={170} center={[lat, lon]} defaultZoom={13}>
        <Marker width={50} anchor={[lat, lon]} />
      </Map>
    </Box>
  );
};
