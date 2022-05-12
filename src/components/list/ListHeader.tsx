import classNames from "classnames";
import { FC } from "react";

interface ListHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: React.ReactNode;
  subtitle: React.ReactNode;
  tail: React.ReactNode;
}
export const ListHeader: FC<ListHeaderProps> = ({ className, ...props }) => {
  return (
    <div className={classNames(className, headerRootClass)}>
      <div>
        <div className={headerLeadingClass}>
          <div className={headerTitleClass}>{props.heading}</div>
        </div>
        {props.subtitle && (
          <div className={headerSubtitleClass}>{props.subtitle}</div>
        )}
      </div>
      {props.tail && <div className={headerTailClass}>{props.tail}</div>}
    </div>
  );
};
const headerRootClass = classNames("flex items-center justify-between gap-4");
const headerLeadingClass = classNames("flex flex-col gap-2");
const headerTailClass = classNames("");
const headerTitleClass = classNames(
  "text-2xl font-extrabold",
  "text-zinc-700",
  "dark:text-zinc-300",
);
const headerSubtitleClass = classNames("text-zinc-500");
