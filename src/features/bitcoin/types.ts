import { SerializedError } from '@reduxjs/toolkit';
import { CSSProperties } from 'react';

export interface DataTime {
  updated: string;
  updatedISO: string;
  updateduk: string;
}

export interface BPIItem extends CSSProperties {
  label: string;
  data: number[];
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
