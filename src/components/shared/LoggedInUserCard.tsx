import classNames from "classnames";
import { FC } from "react";

import { ReactComponent as CaretDownThinIcon } from "../../assets/images/icons/caret-down-thin.svg";
import { Avatar, AvatarProps } from "./Avatar";

interface LoggedInUserCardProps extends React.HTMLAttributes<HTMLDivElement> {
  bigTitle: string;
  subtitle?: React.ReactNode;
  avatar?: AvatarProps;
  arrow?: boolean;
}

export const LoggedInUserCard: FC<LoggedInUserCardProps> = ({
  bigTitle,
  subtitle,
  avatar,
  className,
  arrow,
  ...props
}) => {
  return (
    <div className={classNames(rootClasses, className)} {...props}>
      <Avatar {...avatar} />
      <div className={userDetailClasses}>
        <div className={titleClasses}>
          <span className={titleTextClasses}>{bigTitle}</span>{" "}
          {arrow && <CaretDownThinIcon className="flex-shrink-0" />}
        </div>
        <div className={subtitleClasses}>{subtitle}</div>
      </div>
    </div>
  );
};

const rootClasses = classNames("group flex items-center gap-3 cursor-pointer");
const userDetailClasses = classNames("hidden sm:block");
const titleClasses = classNames(
  "flex gap-2 items-center",
  "text-lg leading-snug font-extrabold",
  "text-zinc-700 group-hover:text-zinc-900",
  "dark:text-zinc-300 dark:group-hover:text-zinc-50",
);
const titleTextClasses = classNames("truncate max-w-[100px]");
const subtitleClasses = classNames(
  "text-base leading-snug font-normal",
  "text-zinc-500 group-hover:text-zinc-700",
  "dark:text-zinc-500 dark:group-hover:text-zinc-300",
  "truncate max-w-[130px]",
);
