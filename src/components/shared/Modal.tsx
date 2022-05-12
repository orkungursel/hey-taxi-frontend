import * as Dialog from "@radix-ui/react-dialog";
import classNames from "classnames";
import { FC, PropsWithChildren, useCallback } from "react";

import { LoadingSpinner } from "./LoadingSpinner";

type ModalSize = "auto" | "md" | "lg" | "xl";

interface ModalProps {
  trigger: React.ReactNode;
  size?: ModalSize;
  className?: string;
  asChild?: boolean;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (state: boolean) => void;
  onClose?: () => void;
  onOpen?: () => void;
}

// eslint-disable-next-line max-lines-per-function
export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  isOpen,
  defaultOpen,
  onOpenChange,
  onOpen,
  onClose,
  children,
  className,
  trigger,
  size,
  asChild,
}) => {
  const onOpenChangeCallback = useCallback(
    (state: boolean) => {
      onOpenChange?.(state);
      if (!state) {
        onClose?.();
        return;
      }

      onOpen?.();
    },
    [onOpenChange, onClose, onOpen],
  );

  return (
    <Dialog.Root
      open={isOpen}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChangeCallback}
    >
      <Dialog.Trigger asChild={asChild}>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={modalOverlayClasses} />
        <Dialog.Content
          className={classNames(
            modalContentClasses,
            className,
            getSizeClass(size),
          )}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

Modal.defaultProps = {
  size: "auto",
};

export const ModalClose = Dialog.Close;

export const ModalLoading: FC = () => {
  return (
    <div className="flex justify-center items-center">
      <LoadingSpinner size="md" />
    </div>
  );
};

interface ModalHeaderProps {
  title: string;
  subtitle?: string;
}

export const ModalHeader: FC<PropsWithChildren<ModalHeaderProps>> = ({
  title,
  subtitle,
}) => {
  return (
    <div className={modalHeaderClasses}>
      <h3 className={modalTitleClasses}>{title}</h3>
      {subtitle && <p className={modalSubtitleClasses}>{subtitle}</p>}
    </div>
  );
};

function getSizeClass(size?: string) {
  switch (size) {
    case "md":
      return "max-w-md";
    case "lg":
      return "max-w-lg";
    case "xl":
      return "max-w-xl";
    case "auto":
    default:
      return "max-w-2xl";
  }
}

const modalContentClasses = classNames(
  "absolute overflow-y-auto z-20",
  "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform-origin-center",
  "w-full max-h-[85vh] p-8",
  "outline-none rounded-2xl shadow-smooth dark:shadow-smooth-dark",
  "bg-white dark:bg-zinc-800 dark:text-current",
  "border border-gray-200 dark:border-gray-900",
);

const modalOverlayClasses = classNames(
  "fixed inset-0 z-10",
  "bg-zinc-900 bg-opacity-25",
  "dark:bg-zinc-900 dark:bg-opacity-50",
);

const modalHeaderClasses = classNames("mb-6");
const modalTitleClasses = classNames(
  "text-3xl font-semibold text-zinc-900 dark:text-white",
);
const modalSubtitleClasses = classNames("mt-1 text-md text-zinc-500");
