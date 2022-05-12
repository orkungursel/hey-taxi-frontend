import classNames from "classnames";
import { FC, PropsWithChildren } from "react";

interface EmptyStateProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const EmptyState: FC<PropsWithChildren<EmptyStateProps>> = ({
  children,
  ...props
}) => {
  return (
    <div className={rootClass}>
      {props.icon && <div className={iconClass}>{props.icon}</div>}
      {props.title && <div className={titleClass}>{props.title}</div>}
      {props.subtitle && <div className={subtitleClass}>{props.subtitle}</div>}
      {children && <div className={contentClass}>{children}</div>}
    </div>
  );
};

const rootClass = classNames(
  "flex flex-col items-center justify-center",
  "p-8",
  "border-2 border-dashed",
  "border-zinc-300",
  "rounded-md",
  "bg-zinc-100",
  "dark:border-zinc-700",
  "dark:bg-zinc-900",
);
const titleClass = classNames(
  "text-2xl font-extrabold",
  "text-center",
  "text-zinc-700",
  "dark:text-zinc-300",
);
const subtitleClass = classNames("text-zinc-500", "text-center");
const iconClass = classNames("mb-4");
const contentClass = classNames("mt-4");
