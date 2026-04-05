import { create } from 'zustand';

export interface KVParam {
  id: number;
  name: string;
  value: string;
  isActive: boolean;
}

export interface PerRequest {
  id: number | string;
  name: string;
  method: string;
  url: string;
  params: {
    params: KVParam[];
    headers: KVParam[];
    auth: KVParam[];
    bodyText: string;
  };
  response?: {
    status: number;
    statusText: string;
    headers: any;
    data: any;
    error?: string;
  };
}

interface SquezeState {
  collection: PerRequest[];
  deleteRequest: (id: number | string) => void;
  addNewRequest: () => void;
  selectedRequestId: number | string;
  setSelectedRequestId: (id: number | string) => void;
  updateRequestInfo: (id: number | string, payload: Partial<PerRequest>) => void;
  updateRequestParams: (id: number | string, section: 'params' | 'headers' | 'auth', params: KVParam[]) => void;
  updateRequestBody: (id: number | string, bodyText: string) => void;
  updateResponse: (id: number | string, response: any) => void;
}

const generateNewRequest = (id?: number | string): PerRequest => {
  return {
    id: id || Math.random(),
    name: 'untitled',
    method: 'GET',
    url: '',
    params: {
      params: [{ id: Date.now(), name: '', value: '', isActive: true }],
      headers: [{ id: Date.now() + 1, name: '', value: '', isActive: true }],
      auth: [],
      bodyText: '',
    },
  };
};

export const useHTTPieStore = create<SquezeState>()((set, get) => ({
  collection: [
    generateNewRequest(298389123)
  ],
  deleteRequest: (id: string | number) => {
    set((state) => {
      const _collection = state.collection.filter((i) => i.id !== id);
      return {
        collection: _collection,
        selectedRequestId: state.selectedRequestId === id && _collection.length > 0 ? _collection[0].id : state.selectedRequestId
      };
    });
  },
  addNewRequest: () => {
    const newRequestId = Math.random();
    set((state) => {
      return {
        collection: [
          ...state.collection,
          { ...generateNewRequest(newRequestId) },
        ],
      };
    });
    return newRequestId as any; // to avoid return type issues
  },
  selectedRequestId: 298389123,
  setSelectedRequestId: (id: number | string) =>
    set((state) => ({ selectedRequestId: id })),
  updateRequestInfo: (id, payload) =>
    set((state) => ({
      collection: state.collection.map((req) =>
        req.id === id ? { ...req, ...payload } : req
      ),
    })),
  updateRequestParams: (id, section, params) =>
    set((state) => ({
      collection: state.collection.map((req) =>
        req.id === id
          ? { ...req, params: { ...req.params, [section]: params } }
          : req
      ),
    })),
  updateRequestBody: (id, bodyText) =>
    set((state) => ({
      collection: state.collection.map((req) =>
        req.id === id
          ? { ...req, params: { ...req.params, bodyText } }
          : req
      ),
    })),
  updateResponse: (id, response) =>
    set((state) => ({
      collection: state.collection.map((req) =>
        req.id === id ? { ...req, response } : req
      ),
    })),
}));
