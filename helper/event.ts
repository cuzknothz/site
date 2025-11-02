import mitt from 'mitt';

type Events = {
  newChat: string;
  deleteChat: string;
};
export const eventMitt = mitt<Events>();
