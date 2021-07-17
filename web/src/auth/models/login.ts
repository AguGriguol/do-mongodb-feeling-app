export type LoginFormSchema = {
  username: string;
};

export type AuthStateSchema = {
  username: string | null;
  status: 'idle' | 'logging' | 'succeeded' | 'failed';
  error?: any;
  accessToken: string | null;
  refreshToken: string | null;
};
