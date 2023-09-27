import { SerializedError } from '@reduxjs/toolkit';

export interface DataTime {
  updated: string;
  updatedISO: string;
  updateduk: string;
}

export interface BPIItem {
  type: 'line';
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
}

export interface Payload {
  bpi: BPIItem;
  chartName: string;
  disclaimer: string;
  time: DataTime;
}

export interface Data {
  bpi: Record<string, BPIItem>;
  chartName: string;
  disclaimer: string;
  time: string[];
}

export interface BitcoinState {
  data: Data;
  isLoading: boolean;
  error: SerializedError;
}
