import type { Drug } from "@/types";
import { createContext, use } from "react";
type ModalContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalData: Drug | null;
  setModalData: React.Dispatch<React.SetStateAction<Drug | null>>;
};
export const ModalContext = createContext<ModalContextType>({
  open: false,
  setOpen: () => {},
  setModalData: () => {},
  modalData: null,
});

export const useModal = () => {
  const context = use(ModalContext);

  return context;
};
