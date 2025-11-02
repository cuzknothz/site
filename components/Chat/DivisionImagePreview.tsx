import clsx from 'clsx';
import { Box } from '../Util/Box';

export interface PreviewImage {
  file: File;
  url: string;
}

interface Props {
  images: PreviewImage[];
  removeImage: (url: string) => void;
}

export const DivisionImagePreview = ({ images, removeImage }: Props) => {
  return (
    <div
      className={clsx(
        'flex gap-2.5 overflow-x-auto',
        images.length && 'p-[15px]',
      )}
    >
      {images.map((img, idx) => (
        <Box
          key={img.url}
          className='relative flex-none overflow-hidden rounded-[20px]'
        >
          <img
            src={img.url}
            alt={`preview-${idx}`}
            className='aspect-square! h-[65px]! w-[65px]! object-cover'
          />
          <button
            className='absolute top-1 right-1 h-6 w-6 cursor-pointer rounded-[50%] border border-[#ccc] bg-white'
            onClick={() => removeImage(img.url)}
            title='Xoá ảnh'
          >
            &times;
          </button>
        </Box>
      ))}
    </div>
  );
};
