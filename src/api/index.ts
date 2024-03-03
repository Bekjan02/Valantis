import axios, { AxiosResponse } from 'axios';

import { BASE_URL } from 'constants/index';
import { IGetIds, IGetItems } from 'types/index';
import { IGetFilterItems } from 'types/requests';

import { generateHash } from 'utils';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Auth': generateHash(import.meta.env.VITE_APP_URL_PASSWORD),
  },
});

export const fetchIds = async ({ limit, offset = 0 }: IGetIds.Params): Promise<IGetIds.Response> => {
  try {
    const response = await axiosInstance.post('', {
      action: 'get_ids',
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching IDs:', error);
    throw error;
  }
};

export const fetchItems = async (ids: IGetItems.Params = ['']): Promise<IGetItems.Response['result']> => {
  try {
    const response: AxiosResponse<IGetItems.Response> = await axiosInstance.post('', {
      action: 'get_items',
      params: { ids },
    });
    const settedData = response.data.result.filter((obj, index, self) => index === self.findIndex((o) => o.id === obj.id));

    return settedData;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

export const filterItems = async (props: IGetFilterItems.Params): Promise<IGetFilterItems.Response> => {
  try {
    const response = await axiosInstance.post('', {
      action: 'filter',
      params: props,
    });
    return response.data;
  } catch (error) {
    console.error('Error filtering items:', error);
    throw error;
  }
};

export const getFields = async (): Promise<string[]> => {
  try {
    const response = await axiosInstance.post('', {
      action: 'get_fields',
      params: { field: 'brand' },
    });
    return [...new Set(response.data.result)] as string[];
  } catch (error) {
    console.error('Error fetching fields:', error);
    throw error;
  }
};
