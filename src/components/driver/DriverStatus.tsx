import classNames from "classnames";
import { FC, PropsWithChildren } from "react";

import { DriverStatusLabel } from "./DriverStatusLabel";

export type DriverStatusType = "idle" | "searching" | "driving" | "finished";

interface DriverStatusProps {
  status?: DriverStatusType;
  className?: string;
}

export const DriverStatus: FC<PropsWithChildren<DriverStatusProps>> = ({
  children,
  status,
  className,
}) => {
  return (
    <div
      className={classNames(
        className,
        driverStatusRootClasses,
        getRootClassesByStatus(status),
      )}
    >
      <DriverStatusLabel status={status} />
      <div className={driverStatusChildClasses}>
        <div className="">{children}</div>
      </div>
    </div>
  );
};

DriverStatus.defaultProps = {
  status: "idle",
};

function getRootClassesByStatus(status?: string) {
  switch (status) {
    case "idle":
      return classNames("border-zinc-300 dark:border-zinc-700");
    case "searching":
      return classNames("border-primary-600 dark:border-primary-700");
    case "driving":
      return classNames("border-lime-500 dark:border-lime-600");
    case "finished":
      return classNames("border-cyan-500 dark:border-cyan-600");
    default:
      return classNames("border-zinc-300 dark:border-zinc-700");
  }
}

const driverStatusRootClasses = classNames(
  "flex items-stretch h-10 gap-px",
  "rounded-md",
  "border",
);

const driverStatusChildClasses = classNames(
  "flex flex-grow flex-nowrap items-center justify-start",
  "px-3 py-2",
  "last:rounded-r-md",
  "text-zinc-500 bg-white",
  "dark:text-zinc-300 dark:bg-zinc-900",
);
