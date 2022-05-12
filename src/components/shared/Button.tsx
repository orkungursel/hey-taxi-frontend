import classNames from "classnames";
import { FC, PropsWithChildren } from "react";

type ButtonSize = "small" | "medium" | "large";
type ButtonColor = "primary" | "secondary" | "tertiary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  color?: ButtonColor;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
  const { size, color, className, children, ...rest } = props;

  return (
    <button
      {...rest}
      className={classNames(
        defaultClasses,
        getSizeClass(size),
        getColorClass(color),
        "hover:underline",
        className,
      )}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  size: "large",
  color: "primary",
};

const defaultClasses = classNames("transition-all rounded-md");

function getSizeClass(size?: ButtonSize) {
  switch (size) {
    default:
    case "large":
      return classNames("border-2 text-2xl font-semibold px-8 py-4");
    case "medium":
      return classNames("border-2 text-xl font-semibold px-6 py-3");
    case "small":
      return classNames("border text-md font-semibold px-4 py-2");
  }
}

function getColorClass(color?: ButtonColor) {
  switch (color) {
    default:
    case "primary":
      return classNames(
        "border-transparent",
        "bg-zinc-800 text-primary-500 hover:bg-zinc-900",
        "dark:border-transparent dark:bg-primary-500 dark:text-zinc-900 dark:hover:bg-primary-500 dark:hover:text-black",
      );
    case "secondary":
      return classNames(
        "border-current",
        "hover:bg-black hover:bg-opacity-5",
        "dark:border-primary-500 dark:text-primary-500 dark:hover:bg-primary-500 dark:hover:bg-opacity-10",
      );
    case "tertiary":
      return classNames(
        "border-transparent",
        "text-zinc-600 hover:text-zinc-900",
        "dark:border-transparent dark:text-primary-300 dark:hover:text-primary-500",
      );
  }
}
