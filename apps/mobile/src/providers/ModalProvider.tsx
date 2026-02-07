import type { DrugListApiResponseType } from "@sudan-codex/db/schema";
import React, { useState } from "react";

import { ModalContext } from "@/hooks/useModal";

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<
    DrugListApiResponseType["data"][number] | null
  >(null);

  return (
    <ModalContext value={{ modalData, setModalData, open, setOpen }}>
      {children}
    </ModalContext>
  );
};
export default ModalProvider;
