import classNames from "classnames";
import { FC, PropsWithChildren } from "react";

import { ReactComponent as LoadingSpinnerSvg } from "../../assets/images/loading-spinner.svg";

type IconButtonColor = "default" | "primary" | "success";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  color?: IconButtonColor;
}

export const IconButton: FC<PropsWithChildren<IconButtonProps>> = ({
  children,
  loading,
  color,
  ...rest
}) => {
  return (
    <button
      className={classNames(iconButtonRootClasses, getColorClasses(color))}
      {...rest}
    >
      {children}
      {loading && (
        <div className={iconButtonLoadingClasses}>
          <LoadingSpinnerSvg
            className={classNames(
              iconButtonLoadingSvgClasses,
              getLoadingColorClasses(color),
            )}
          />
        </div>
      )}
    </button>
  );
};

function getColorClasses(color?: IconButtonColor) {
  switch (color) {
    default:
    case "default":
      return classNames(
        "text-zinc-800",
        "hover:text-zinc-900",
        "hover:bg-zinc-100",
        "dark:text-zinc-500",
        "dark:hover:text-zinc-100",
        "dark:hover:bg-zinc-900",
      );
    case "primary":
      return classNames(
        "text-zinc-900",
        "dark:text-primary-500",
        "hover:bg-zinc-100 dark:hover:bg-zinc-900",
      );
    case "success":
      return classNames(
        "text-lime-500",
        "dark:text-lime-500",
        "hover:bg-lime-100 dark:hover:bg-lime-900",
      );
  }
}

function getLoadingColorClasses(color?: IconButtonColor) {
  switch (color) {
    default:
    case "default":
    case "primary":
      return classNames(
        "text-white fill-zinc-900",
        "dark:text-gray-800 dark:fill-primary-500",
      );
    case "success":
      return classNames(
        "text-white fill-lime-500",
        "dark:text-gray-800 dark:fill-lime-500",
      );
  }
}

const iconButtonRootClasses = classNames(
  "h-10 w-10",
  "aspect-square",
  "relative",
  "flex items-center justify-center",
  "rounded-full",
);

const iconButtonLoadingClasses = classNames(
  "absolute inset-0",
  "rounded-full",
  "animate-spin",
  "z-10",
  "pointer-events-none",
);

const iconButtonLoadingSvgClasses = classNames();
