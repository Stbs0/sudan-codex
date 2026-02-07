import type { DrugListApiResponseType } from "@sudan-codex/db/schema";
import { createContext, use } from "react";
type ModalContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalData: DrugListApiResponseType["data"][number] | null;
  setModalData: React.Dispatch<
    React.SetStateAction<DrugListApiResponseType["data"][number] | null>
  >;
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
