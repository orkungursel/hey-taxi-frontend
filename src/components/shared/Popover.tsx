import * as PO from "@radix-ui/react-popover";
import classNames from "classnames";
import { FC, PropsWithChildren, ReactNode, useCallback } from "react";

import { LoadingSpinner } from "./LoadingSpinner";

type PopoverSize = "auto" | "md";

interface PopoverProps {
  trigger: React.ReactNode;
  size?: PopoverSize;
  className?: string;
  asChild?: boolean;
  isOpen?: boolean;
  onOpenChange?: (state: boolean) => void;
  onClose?: () => void;
  onOpen?: () => void;
}

export const Popover: FC<PropsWithChildren<PopoverProps>> = ({
  isOpen,
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
    <PO.Root open={isOpen} onOpenChange={onOpenChangeCallback}>
      <PO.Trigger asChild={asChild}>{trigger}</PO.Trigger>
      <PO.Content className={classNames(className, getSizeClass(size))}>
        <div className={popoverContainerClasses}>{children}</div>
      </PO.Content>
    </PO.Root>
  );
};

Popover.defaultProps = {
  size: "auto",
};

interface PopoverHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
}

export const PopoverHeader: FC<PropsWithChildren<PopoverHeaderProps>> = ({
  title,
  subtitle,
}) => {
  return (
    <div className={popoverHeaderClasses}>
      <h3 className={popoverTitleClasses}>{title}</h3>
      {subtitle && <p className={popoverSubtitleClasses}>{subtitle}</p>}
    </div>
  );
};

function getSizeClass(size?: string) {
  switch (size) {
    case "md":
      return "w-[300px] sm:w-[400px] md:w-[450px]";
    case "auto":
    default:
      return "";
  }
}

export const PopoverLoading: FC = () => {
  return (
    <div className="flex justify-center items-center">
      <LoadingSpinner size="md" />
    </div>
  );
};

const popoverHeaderClasses = classNames("mb-6");
const popoverTitleClasses = classNames(
  "text-2xl font-bold text-gray-900 dark:text-white",
);
const popoverSubtitleClasses = classNames("mt-1 text-sm text-gray-500");

const popoverContainerClasses = classNames(
  "relative",
  "max-w-screen-sm p-8",
  "rounded-md shadow-smooth dark:shadow-smooth-dark",
  "bg-white dark:bg-gray-dark-700",
  "dark:text-white",
  "border border-gray-200 dark:border-gray-900",
);
