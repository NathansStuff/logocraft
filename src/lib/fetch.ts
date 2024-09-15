import { ApiResponse } from '@/types/ApiResponse';
import axios, { AxiosResponse } from 'axios';

export async function getRequest<T>(url: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateRequest<T>(
  url: string,
  data: any
): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<T> = await axios.put(url, data);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function postRequest<T>(
  url: string,
  data: any
): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<T> = await axios.post(url, data);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteRequest<T>(
  url: string,
  apiKey?: string
): Promise<ApiResponse<T>> {
  try {
    const headers = apiKey ? { 'x-api-key': apiKey } : undefined;
    const response: AxiosResponse<T> = await axios.delete(url, { headers });
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
