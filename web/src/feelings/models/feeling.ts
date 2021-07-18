import { EntityState } from '@reduxjs/toolkit';

export type FeelingFormSchema = {
  title: string,
  type: string;
  shortDescription: string;
  feelingDescription: string
  image: File | null | string;
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
  feelingPicture?: {
      fileName: string;
  };
  created: string;
  deleteStatus?: 'idle' | 'deleting'
};

export interface FeelingType {
  _id: string;
  code: string;
};

export interface FeelingStatus {
  status: 'idle' | 'searching' | 'succeeded' | 'failed';
};

export interface FeelingState {
  feelings: EntityState<Feeling> & FeelingStatus,
  deleteStatus: 'idle' | 'deleting' | 'succeeded' | 'failed';
  feelingTypes: EntityState<FeelingType>,
  feelingUpsertStatus: 'idle' | 'saving' | 'succeeded' | 'failed';
  feelingFecthStatus: 'idle' | 'searching' | 'succeeded' | 'failed';
  selectedFeeling: Feeling | null;
};