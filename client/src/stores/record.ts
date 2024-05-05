import { create } from 'zustand';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface recordState {
  today: Value;
  onChange: (date: Value) => void;
}

export const useRecordStore = create<recordState>((set) => ({
  today: new Date(),
  onChange: (date: Value) => set({ today: date }),
}));
