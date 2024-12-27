"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import style from "./modal.module.css";

export default function Modal({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({ top: 0 });
    }
  }, []);

  return createPortal(
    <dialog
      ref={dialogRef}
      className={style.modal}
      onClick={(e) => {
        // if ((e.target as any).nodeName === "DIALOG") {
        //     router.back();
        // }
        if (e.target instanceof HTMLDialogElement) {
          router.back();
        }
      }}
      onClose={() => {
        router.back();
      }}
    >
      {children}
    </dialog>,
    document.getElementById("modal-root") as HTMLElement
  );
}
