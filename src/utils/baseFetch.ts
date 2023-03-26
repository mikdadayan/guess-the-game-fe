interface FetchOptions {
  method: string;
  headers: { [key: string]: any };
  body?: any;
}

export const baseFetchData = async (url: string, options: FetchOptions) => {
  const response = await fetch(url, options);
  return await response.json();
};
