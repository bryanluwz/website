import { HTTPStatusBody } from "./typings";

export const checkStatus = <T>(
  response: T & { status?: HTTPStatusBody; statusText?: string }
): T => {
  if ("error" in response) {
    throw new Error("Error in response");
  }

  const { code } = response?.status as HTTPStatusBody;
  const statusCode = Number(code);
  if (statusCode >= 200 && statusCode < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    throw error;
  }
};

export const handleError = (error: any) => {
  console.error(error);
};

export const _fetch = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    ...options,
  });

  return response;
};

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
};
