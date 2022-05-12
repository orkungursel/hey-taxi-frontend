import classNames from "classnames";
import { FC, HTMLProps } from "react";

interface ListWrapperProps extends HTMLProps<HTMLDivElement> {}

export const ListContainer: FC<ListWrapperProps> = ({
  className,
  ...props
}) => <div className={classNames(wrapperClass, className)} {...props} />;

const wrapperClass = classNames(
  "flex flex-col items-stretch",
  "max-w-md min-w-max rounded-md",
  "p-8 gap-8",
  "bg-white",
  "shadow-smooth",
  "dark:bg-zinc-900",
  "dark:shadow-smooth-dark",
);
