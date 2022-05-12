import classNames from "classnames";

import { ReactComponent as LoadingSpinnerSvg } from "../../assets/images/loading-spinner.svg";

type Color = "primary" | "invert";
type Size = "sm" | "md" | "lg";

interface LoadingSpinnerProps extends React.HTMLAttributes<SVGElement> {
  color?: Color;
  size?: Size;
}

export function LoadingSpinner(props: LoadingSpinnerProps) {
  const { color, size, className, ...rest } = props;

  const defaultClass = `inline animate-spin`;
  const colorClass = getLoadingSpinnerColorClassName(color);
  const sizeClass = getLoadingSpinnerSizeClassName(size);

  return (
    <LoadingSpinnerSvg
      {...rest}
      className={classNames(className, defaultClass, colorClass, sizeClass)}
    />
  );
}

function getLoadingSpinnerColorClassName(color?: Color) {
  switch (color) {
    default:
    case "primary":
      return classNames(
        "text-gray-200 fill-black",
        "dark:text-gray-800 dark:fill-primary-yellow-darker",
      );
    case "invert":
      return classNames(
        "fill-gray-200 text-black",
        "dark:fill-gray-800 dark:text-primary-yellow-darker",
      );
  }
}

function getLoadingSpinnerSizeClassName(size?: Size) {
  switch (size) {
    case "sm":
      return "h-4 w-4";
    default:
    case "md":
      return "h-8 w-8";
    case "lg":
      return "h-12 w-12";
  }
}
