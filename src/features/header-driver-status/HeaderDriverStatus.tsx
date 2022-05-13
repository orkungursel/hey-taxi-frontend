import { FC, useCallback } from "react";

import { ReactComponent as CaretDownThinIcon } from "../../assets/images/icons/caret-down-thin.svg";
import { DriverStatus } from "../../components/driver/DriverStatus";
import {
  Popover,
  PopoverHeader,
  PopoverLoading,
} from "../../components/shared/Popover";
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupLabel,
} from "../../components/shared/RadioGroup";
import { useAppDispatch } from "../../lib/store";
import {
  GetCurrentVehicleThunk,
  UseCurrentVehicle,
  UseCurrentVehiclesLoading,
} from "../../lib/store/vehicle/vehicleSlice";
import {
  setIsOpen,
  UseVehicleSelector,
  UseVehicleSelectorIsOpen,
} from "../../lib/store/vehicle-selector/vehicleSelectorSlice";

interface HeaderDriverStatusProps {}

export const HeaderDriverStatus: FC<HeaderDriverStatusProps> = () => {
  const dispatch = useAppDispatch();
  const isOpen = UseVehicleSelectorIsOpen();
  const openVehicleSelector = useCallback(
    (state: boolean) => {
      dispatch(setIsOpen(state));
    },
    [dispatch],
  );

  return (
    <DriverStatus status="idle">
      <Popover
        size="md"
        trigger={<HeaderDriverStatusVehicleSeletorTrigger />}
        isOpen={isOpen}
        onOpenChange={openVehicleSelector}
      >
        <HeaderDriverStatusVehicleSelector />
      </Popover>
    </DriverStatus>
  );
};

interface HeaderDriverStatusVehicleSeletorTriggerProps {}

export const HeaderDriverStatusVehicleSeletorTrigger: FC<
  HeaderDriverStatusVehicleSeletorTriggerProps
> = () => {
  const vehicle = UseCurrentVehicle();
  const isLoading = UseCurrentVehiclesLoading();

  return (
    <div className="flex flex-grow flex-nowrap items-center justify-start gap-2">
      <div className="max-w-[100px] truncate">
        {isLoading ? "..." : vehicle?.plate || "Select Vehicle"}
      </div>
      <CaretDownThinIcon />
    </div>
  );
};

interface HeaderDriverStatusVehicleSelectorProps {}

export const HeaderDriverStatusVehicleSelector: FC<
  HeaderDriverStatusVehicleSelectorProps
  // eslint-disable-next-line max-lines-per-function
> = () => {
  const dispatch = useAppDispatch();
  const vehicle = UseCurrentVehicle();
  const { vehicles, loading } = UseVehicleSelector();

  const openVehicleSelector = useCallback(
    (value: string) => {
      dispatch(GetCurrentVehicleThunk(value));
    },
    [dispatch],
  );

  return (
    <>
      <PopoverHeader
        title="Select Vehicle"
        subtitle="Officia culpa elit ad anim reprehenderit. Labore laboris officia eiusmod officia voluptate."
      />
      {loading ? (
        <PopoverLoading />
      ) : (
        <RadioGroup
          className="-mx-8"
          value={vehicle?.id}
          onValueChange={openVehicleSelector}
        >
          {vehicles.map((vehicle) => (
            <RadioGroupItem
              key={vehicle.id}
              value={vehicle.id}
              isRounded={false}
            >
              <RadioGroupLabel subtitle={vehicle.plate}>
                {vehicle.name}
              </RadioGroupLabel>
            </RadioGroupItem>
          ))}
        </RadioGroup>
      )}
    </>
  );
};
