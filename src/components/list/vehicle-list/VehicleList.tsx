import classNames from "classnames";
import { FC } from "react";

import { ReactComponent as MarkerDistanceIcon } from "../../../assets/images/icons/marker-distance.svg";
import NoColorVehicleImage from "../../../assets/images/vehicle-types/no-color.png";
import TurquiseVehicleImage from "../../../assets/images/vehicle-types/turquise.png";
import YellowVehicleImage from "../../../assets/images/vehicle-types/yellow.png";
import { VehicleClass, VehicleType } from "../../../models/Vehicle";
import {
  itemActionClass,
  ListItem,
  ListItemBaseProps,
  onClickListRootCallback,
} from "../ListItem";

export const CALL_BUTTON_TEXT = "Call";
export const KM_TEXT = "km";

export interface VehicleListItemProps
  extends ListItemBaseProps,
    ListItemDistanceProps {
  name: string;
  class: VehicleClass;
  type: VehicleType;
  onClickActionButton: onClickListRootCallback;
}

export const VehicleListItem: FC<VehicleListItemProps> = (props) => {
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
      imageSrc={getVehicleImageSrc(props.type)}
      imageAlt={props.name}
      primaryContent={props.name}
      secondaryContent={secondarySlot}
      actionSlot={actionSlot}
      onClick={props.onClick}
    />
  );
};

function getVehicleImageSrc(type: VehicleType) {
  switch (type) {
    default:
      return NoColorVehicleImage;
    case VehicleType.SUV:
      return YellowVehicleImage;
    case VehicleType.Van:
      return TurquiseVehicleImage;
  }
}

interface ListItemDistanceProps {
  distance: number;
}

export const ListItemDistance: FC<ListItemDistanceProps> = ({ distance }) => {
  return (
    <div className={classNames(itemDistanceClass, getDistanceClass(distance))}>
      <MarkerDistanceIcon />
      <span>{distance + KM_TEXT}</span>
    </div>
  );
};

export const itemDistanceClass = classNames(
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
