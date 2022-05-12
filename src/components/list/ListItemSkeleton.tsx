import classNames from "classnames";
import { FC } from "react";

import { ReactComponent as MarkerDistanceIcon } from "../../assets/images/icons/marker-distance.svg";
import {
  itemActionClass,
  itemImageClass,
  itemImageWrapperClass,
  ListItem,
} from "./ListItem";
import { itemDistanceClass } from "./vehicle-list/VehicleList";

export interface ListItemSkeletonProps {
  count?: number;
  displayImage?: boolean;
}

export const ListItemSkeleton: FC<ListItemSkeletonProps> = (props) => {
  let length = props.count || 1;
  if (length < 1) {
    length = 1;
  } else if (length > 5) {
    length = 5;
  }

  return (
    <>
      {Array.from({ length }, (_, i) => (
        <ListItem
          id={"id" + i}
          className={classNames(skeletonClass)}
          imageSlot={props.displayImage && imageSlot}
          primaryContent={primaryContent}
          secondaryContent={secondarySlot}
          actionSlot={actionSlot}
        />
      ))}
    </>
  );
};

const imageSlot = (
  <div className={classNames(itemImageWrapperClass)}>
    <div className={classNames(itemImageClass, "bg-current opacity-10")} />
  </div>
);

const secondarySlot = (
  <div className={classNames(itemDistanceClass)}>
    <MarkerDistanceIcon className="opacity-20" />
    <span className="block h-2 w-12 my-1 rounded-md bg-current opacity-20" />
  </div>
);

const actionSlot = (
  <button className={itemActionClass}>
    <span className="block h-5 w-8 rounded-md bg-current opacity-10" />
  </button>
);

const primaryContent = (
  <span className="block h-3 w-32 rounded-md bg-current opacity-20" />
);

const skeletonClass = classNames(
  "animate-pulse pointer-events-none transform-gpu will-change-transform",
);
