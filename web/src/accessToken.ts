let accessToken: string = '';

export const setAccessToken = (s: string): void => {
  accessToken = s;
};

export const getAccessToken = (): string => {
  return accessToken;
};
