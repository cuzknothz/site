import { create } from 'zustand';

interface PerRequest {
  id: number | string;
  name: string;
  method: string;
  url: string;
  params: {
    params: Object;
    headers: Object;
    auth: Object;
    body: Object;
  };
}

interface SquezeState {
  collection: PerRequest[];
  deleteRequest: (id: number | string) => void;
  addNewRequest: () => void;
  selectedRequestId: number | string;
  setSelectedRequestId: (id: number | string) => void;
}

const generateNewRequest = (): PerRequest => {
  return {
    id: Math.random(),
    name: 'untitled',
    method: 'GET',
    url: '',
    params: {
      params: {},
      headers: {},
      auth: {},
      body: {},
    },
  };
};

export const useHTTPieStore = create<SquezeState>()((set, get) => ({
  collection: [
    {
      id: 298389123,
      name: 'untitled',
      method: 'GET',
      url: '',
      params: {
        params: {},
        headers: {},
        auth: {},
        body: {},
      },
    },
    {
      id: 2983892123,
      name: 'untitled',
      method: 'GET',
      url: '',
      params: {
        params: {},
        headers: {},
        auth: {},
        body: {},
      },
    },
    {
      id: 29838339123,
      name: 'untitled',
      method: 'GET',
      url: '',
      params: {
        params: {},
        headers: {},
        auth: {},
        body: {},
      },
    },
    {
      id: 298382349123,
      name: 'untitled',
      method: 'GET',
      url: '',
      params: {
        params: {},
        headers: {},
        auth: {},
        body: {},
      },
    },
    {
      id: 298344489123,
      name: 'untitled',
      method: 'GET',
      url: '',
      params: {
        params: {},
        headers: {},
        auth: {},
        body: {},
      },
    },
  ],
  deleteRequest: (id: string | number) => {
    set((state) => {
      const _collection = state.collection.filter((i) => i.id !== id);
      return {
        collection: _collection,
      };
    });
  },
  addNewRequest: () => {
    const newRequestId = Math.random();
    set((state) => {
      return {
        collection: [
          ...state.collection,
          { ...generateNewRequest(), id: newRequestId },
        ],
      };
    });
    return newRequestId;
  },
  selectedRequestId: 298389123,
  setSelectedRequestId: (id: number | string) =>
    set((state) => ({ selectedRequestId: id })),
}));
