import classNames from "classnames";
import { FC } from "react";

import { ReactComponent as MarkerDistanceIcon } from "../../../assets/images/icons/marker-distance.svg";
import {
  itemActionClass,
  ListItem,
  ListItemBaseProps,
  onClickListRootCallback,
} from "../ListItem";

const CALL_BUTTON_TEXT = "Accept";
const KM_TEXT = "km";

export interface FareListItemProps
  extends ListItemBaseProps,
    ListItemDistanceProps {
  name: string;
  onClickActionButton: onClickListRootCallback;
}

export const FareListItem: FC<FareListItemProps> = (props) => {
  const secondarySlot = <ListItemDistance distance={props.distance} />;
  const actionSlot = (
    <button
      className={itemActionClass}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        return props.onClickActionButton(props.id, e);
      }}
    >
      {CALL_BUTTON_TEXT}
    </button>
  );

  return (
    <ListItem
      id={props.id}
      isSelected={props.isSelected}
      primaryContent={props.name}
      secondaryContent={secondarySlot}
      actionSlot={actionSlot}
      onClick={props.onClick}
    />
  );
};

interface ListItemDistanceProps {
  distance: number;
}

const ListItemDistance: FC<ListItemDistanceProps> = ({ distance }) => {
  return (
    <div className={classNames(itemDistanceClass, getDistanceClass(distance))}>
      <MarkerDistanceIcon />
      <span>{distance + KM_TEXT}</span>
    </div>
  );
};

const itemDistanceClass = classNames(
  "inline-flex items-center gap-1 text-sm",
  "group-selected:text-sky-400",
  "dark:group-selected:text-primary-600",
);

const itemLowDistanceClass = classNames(
  "text-green-500",
  "group-hover:text-green-600",
  "dark:text-green-500",
  "dark:group-hover:text-green-400",
);
const itemMidDistanceClass = classNames(
  "text-zinc-400",
  "group-hover:text-zinc-500",
  "dark:text-zinc-500",
  "dark:group-hover:text-zinc-300",
);

const itemHighDistanceClass = classNames(
  "text-red-400",
  "group-hover:text-red-500",
  "dark:text-red-500",
  "dark:group-hover:text-red-400",
);

// distance is in km
function getDistanceClass(distance: number) {
  if (distance < 3) {
    return itemLowDistanceClass;
  } else if (distance < 10) {
    return itemMidDistanceClass;
  }

  return itemHighDistanceClass;
}
