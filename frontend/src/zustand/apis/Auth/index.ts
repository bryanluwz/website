import { create } from "zustand";
import { checkStatus, handleError } from "../../../apis/utils";

interface ExampleState {}

const initialStates = {};

export const useAuthStore = create<ExampleState>((set) => ({
  ...initialStates,
}));
