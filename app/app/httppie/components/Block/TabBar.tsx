import { useHTTPieStore } from '@/store/app/httpiez';
import { MiniTab } from '../Common/MiniTab';

export const TabBar = () => {
  const collection = useHTTPieStore((_) => _.collection);
  const addNewRequest = useHTTPieStore((_) => _.addNewRequest);
  const setSelectedRequestId = useHTTPieStore((_) => _.setSelectedRequestId);

  const onAddNewRequest = () => {
    const idRequest = addNewRequest();
    console.log('idRequest', idRequest);
    setSelectedRequestId(idRequest as unknown as string);
  };

  return (
    <div className='py-[10px]'>
      <div className='flex gap-[5px]'>
        {collection.map(({ id, method, name }) => (
          <MiniTab key={id} id={id} method={method} name={name} />
        ))}
        <button
          onClick={onAddNewRequest}
          className='flex h-[30px] w-[30px] items-center justify-center rounded-[8px] hover:bg-[#dfdfdf]'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='18'
            height='18'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path d='M5 12h14' />
            <path d='M12 5v14' />
          </svg>
        </button>
      </div>
    </div>
  );
};
