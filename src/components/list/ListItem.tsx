import classNames from "classnames";
import { FC, useCallback } from "react";

export type onClickListRootCallback = (
  id: string,
  e: React.MouseEvent<HTMLElement, MouseEvent>,
) => void;

export interface ListItemBaseProps {
  id: string;
  isSelected?: boolean;
  className?: string;
  onClick?: onClickListRootCallback;
}

export interface ListItemImageSlotProps {
  imageSlot?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
}

export interface ListItemDetailsSlotProps {
  primaryContent?: React.ReactNode;
  primarySlot?: React.ReactNode;
  secondaryContent?: React.ReactNode;
  secondarySlot?: React.ReactNode;
}

export interface ListItemActionSlotProps {
  actionSlot?: React.ReactNode;
}

export interface ListItemProps
  extends ListItemImageSlotProps,
    ListItemDetailsSlotProps,
    ListItemActionSlotProps {}

export const ListItem: FC<ListItemBaseProps & ListItemProps> = (props) => {
  const { id, onClick } = props;
  const onClickCallback = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      onClick && onClick(id, e);
    },
    [id, onClick],
  );

  return (
    <div
      className={classNames(
        itemRootClass,
        props.isSelected && "is-selected",
        props.className,
      )}
      onClick={onClickCallback}
    >
      <ImageSlot {...props} />
      <DetailsSlot {...props} />
      <ActionSlot {...props} />
    </div>
  );
};

const ImageSlot: FC<ListItemImageSlotProps> = (props) => {
  return (
    <>
      props.imageSlot ?? (props.imageSrc ? (
      <div className={itemImageWrapperClass}>
        <img
          src={props.imageSrc}
          alt={props.imageAlt}
          className={itemImageClass}
        />
      </div>
      ) : null)
    </>
  );
};

const DetailsSlot: FC<ListItemDetailsSlotProps> = (props) => {
  return (
    <>
      <div className={itemDetailsClass}>
        {props.primarySlot
          ? props.primarySlot
          : props.primaryContent && (
              <div className={itemDetailsPrimaryClass}>
                {props.primaryContent}
              </div>
            )}
        {props.secondarySlot
          ? props.secondarySlot
          : props.secondaryContent && (
              <div className={itemDetailsSecondaryClass}>
                {props.secondaryContent}
              </div>
            )}
      </div>
    </>
  );
};

const ActionSlot: FC<ListItemActionSlotProps> = (props) => {
  return (
    <>
      {props.actionSlot && (
        <div className={itemActionWrapperClass}>{props.actionSlot}</div>
      )}
    </>
  );
};

const itemRootClass = classNames(
  "flex group",
  "items-center",
  "-mx-8 cursor-pointer",
  "border-y",
  // light
  "border-transparent",
  "bg-zinc-100",
  "hover:bg-zinc-200",
  // light:selected
  "selected:border-sky-400",
  "selected:text-sky-500",
  "selected:bg-sky-100",
  // dark
  "dark:bg-zinc-800",
  "dark:hover:bg-zinc-700",
  // dark:selected
  "dark:selected:border-primary-500",
  "dark:selected:text-primary-500",
  "dark:selected:bg-primary-900",
);

export const itemImageWrapperClass = classNames("flex-shrink-0", "mx-6");
export const itemImageClass = classNames("w-20", "h-20");
const itemDetailsClass = classNames(
  "flex flex-col flex-1 items-start",
  "gap-1 my-2 first:ml-8",
);
const itemDetailsPrimaryClass = classNames(
  "font-extrabold truncate max-w-[200px]",
);
const itemDetailsSecondaryClass = classNames(
  "inline-flex items-center gap-1 text-sm",
  "group-selected:text-sky-400",
  "dark:group-selected:text-primary-600",
);
const itemActionWrapperClass = classNames("flex-shrink-0", "mx-4");
export const itemActionClass = classNames(
  itemActionWrapperClass,
  "px-4 py-2 rounded-md",
  "hover:bg-zinc-300",
  "group-selected:hover:text-sky-700",
  "group-selected:hover:bg-sky-500 group-selected:hover:bg-opacity-40",
  "dark:hover:bg-zinc-800",
  "dark:group-selected:hover:text-primary-500",
  "dark:group-selected:hover:bg-black dark:group-selected:hover:bg-opacity-25",
);
