import { ConvertInputDto } from "../dto/convert.input.dto";

export interface conversionData {
  rate: number;
  query: ConvertInputDto;
  timestamp: number;
  currency: string;
}

export interface getRatesInput {
  source: string;
  destinations: string[];
  date: string;
}

export interface conversionOutput {
  source: string;
  destination: string;
  timestamp: number;
  amount: number;
  rate: number;
  result: string;
}
