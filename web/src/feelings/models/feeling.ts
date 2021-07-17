import { EntityState } from '@reduxjs/toolkit';

export type FeelingFormSchema = {
  title: string,
  type: string;
  image: File | null;
};

export interface Feeling {
  _id: string;
  title: string;
  feelingType: {
      id: string;
      code: string;
  },
  shortDescription: string;
  feelingDescription: string;
  feelingPicture: {
      fileName: string;
  };
  created: string;
  deleteStatus?: 'idle' | 'deleting'
};

export interface FeelingStatus {
  status: 'idle' | 'searching' | 'succeeded' | 'failed';
};

export interface FeelingState {
  feelings: EntityState<Feeling> & FeelingStatus,
  deleteStatus: 'idle' | 'deleting' | 'succeeded' | 'failed';
};