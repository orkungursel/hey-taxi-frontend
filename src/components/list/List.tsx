import classNames from "classnames";
import { FC, PropsWithChildren } from "react";

interface ListProps extends PropsWithChildren<any> {
  className?: string;
}

export const List: FC<ListProps> = ({ className, ...props }) => (
  <div className={classNames(rootClass, className)} {...props} />
);

const rootClass = classNames("flex flex-col items-stretch", "gap-[2px]");
