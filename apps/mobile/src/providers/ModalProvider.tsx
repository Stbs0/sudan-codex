import { ModalContext } from "@/hooks/useModal";
import type { Drug } from "@/types";
import React, { useState } from "react";

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<Drug | null>(null);

  return (
    <ModalContext value={{ modalData, setModalData, open, setOpen }}>
      {children}
    </ModalContext>
  );
};
export default ModalProvider;
