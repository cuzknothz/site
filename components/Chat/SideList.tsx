import { Box } from '../ui/Box';
import { BackDrop } from '../Util/BackDrop';

export const SideList = () => {
  return (
    <BackDrop>
      <Box className='w-full min-h-[300px] p-[20px]'>
        <p>Chats</p>
        <div className='mt-[20px] flex flex-col gap-[10px]'>
          <Box className='rounded-[10px]! px-[10px] py-[5px]'>
            <p>Conversation 1</p>
          </Box>
          <Box className='rounded-[10px]! px-[10px] py-[5px]'>
            <p>Conversation 2</p>
          </Box>
          <Box className='rounded-[10px]! px-[10px] py-[5px]'>
            <p>Conversation 2</p>
          </Box>
          {/* <Box className='rounded-[10px]! px-[10px] py-[5px]'>
            <p>Conversation 2</p>
          </Box> */}
          <Box className='rounded-[10px]! px-[10px] py-[5px]'>
            <p>Conversation 2</p>
          </Box>
          <Box className='rounded-[10px]! px-[10px] py-[5px]'>
            <p>Conversation 2</p>
          </Box>
        </div>
      </Box>
    </BackDrop>
  );
};
