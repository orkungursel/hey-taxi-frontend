import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { ReactComponent as CaretDownThinIcon } from "../../assets/images/icons/caret-down-thin.svg";
import { Popover, PopoverHeader } from "../shared/Popover";
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupLabel,
} from "../shared/RadioGroup";
import { DriverStatus } from "./DriverStatus";
import { DriverStatusLabel } from "./DriverStatusLabel";

export default {
  title: "Driver/Status",
  component: DriverStatus,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    children: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <div className="flex px-8 py-8 bg-white shadow-header dark:bg-zinc-800 dark:shadow-header-dark">
        <Story />
      </div>
    ),
  ],
  subcomponents: { DriverStatusLabel },
} as ComponentMeta<typeof DriverStatus>;

const Template: ComponentStory<typeof DriverStatus> = (args) => (
  <DriverStatus {...args} />
);

export const IdleState = Template.bind({});
IdleState.args = {
  children: (
    <Popover
      size="md"
      trigger={
        <div className="flex flex-grow flex-nowrap items-center justify-start gap-2">
          <div className="max-w-[100px] truncate">34FF2256</div>
          <CaretDownThinIcon />
        </div>
      }
    >
      <PopoverHeader
        title="Select Vehicle"
        subtitle="Officia culpa elit ad anim reprehenderit. Labore laboris officia eiusmod officia voluptate."
      />
      <RadioGroup className="-mx-8">
        <RadioGroupItem value="34FF2256" isRounded={false}>
          <RadioGroupLabel subtitle="34FF2256">Vehicle Name #1</RadioGroupLabel>
        </RadioGroupItem>
        <RadioGroupItem value="34TY6748" isRounded={false}>
          <RadioGroupLabel subtitle="34TY6748">Vehicle Name #2</RadioGroupLabel>
        </RadioGroupItem>
      </RadioGroup>
    </Popover>
  ),
};

export const SearchingState = Template.bind({});
SearchingState.args = {
  ...IdleState.args,
  status: "searching",
};

export const DrivingState = Template.bind({});
DrivingState.args = {
  ...IdleState.args,
  status: "driving",
};

export const FinishedState = Template.bind({});
FinishedState.args = {
  ...IdleState.args,
  status: "finished",
};
