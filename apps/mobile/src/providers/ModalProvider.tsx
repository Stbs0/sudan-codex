import type { Drug } from "@sudan-codex/db";
import React, { useState } from "react";

import { ModalContext } from "@/hooks/useModal";

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
