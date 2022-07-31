export type APIItem = {
  token_id: string;
  token_uri: string;
  metadata: string;
};

export type MetaDataJSON = {
  image?: string;
  name?: string;
  description?: string;
  animation_url?: string;
};

export type NFTItem = Omit<APIItem, 'metadata'> & MetaDataJSON & { id: string };
