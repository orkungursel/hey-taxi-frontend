import classNames from "classnames";
import { FC } from "react";

import { ReactComponent as CheckIcon } from "../../assets/images/icons/check.svg";
import { ReactComponent as NavIcon } from "../../assets/images/icons/nav.svg";
import { ReactComponent as NavPassiveIcon } from "../../assets/images/icons/nav-passive.svg";
import { ReactComponent as LoadingSpinnerSvg } from "../../assets/images/loading-spinner.svg";
import { DriverStatusType } from "./DriverStatus";

interface DriverStatusLabelProps {
  status?: DriverStatusType;
}

export const DriverStatusLabel: FC<DriverStatusLabelProps> = ({ status }) => {
  return (
    <div className={classNames(rootClasses, getLabelClassesByStatus(status))}>
      <div className="w-6 h-6">{getIconByStatus(status)}</div>
      <div className={labelClasses}>{getLabelByStatus(status)}</div>
    </div>
  );
};

function getIconByStatus(status?: string) {
  // eslint-disable-next-line sonarjs/no-all-duplicated-branches
  switch (status) {
    case "idle":
      return <NavPassiveIcon />;
    case "searching":
      return (
        <div className="p-[2px]">
          <LoadingSpinnerSvg className="fill-primary-200 dark:fill-primary-900 animate-spin" />
        </div>
      );
    case "driving":
      return <NavIcon />;
    case "finished":
      return <CheckIcon />;
    default:
      return <NavIcon />;
  }
}

function getLabelByStatus(status?: string) {
  switch (status) {
    default:
    case "idle":
      return "Idle";
    case "searching":
      return "Searching";
    case "driving":
      return "Driving";
    case "finished":
      return "Finished";
  }
}

function getLabelClassesByStatus(status?: string) {
  switch (status) {
    default:
    case "idle":
      return classNames(
        "text-zinc-500 bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300",
      );
    case "searching":
      return classNames(
        "text-primary-800 bg-primary-200 dark:bg-primary-900 dark:text-primary-500",
      );
    case "driving":
      return classNames(
        "text-white bg-lime-500 dark:text-lime-400 dark:bg-lime-900",
      );
    case "finished":
      return classNames(
        "text-white bg-cyan-500 dark:bg-cyan-900 dark:text-cyan-400",
      );
  }
}

const rootClasses = classNames(
  "flex flex-grow items-center gap-2 justify-center",
  "px-3 py-2",
  "rounded-l-md",
  "text-medium",
);

const labelClasses = classNames();
