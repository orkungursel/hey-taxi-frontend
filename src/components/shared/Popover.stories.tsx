import { ComponentStory, Meta } from "@storybook/react";
import React from "react";

import { Button } from "./Button";
import { Popover, PopoverHeader, PopoverLoading } from "./Popover";

export default {
  title: "Shared/Popover",
  component: Popover,
  argTypes: {
    trigger: {
      control: false,
    },
    children: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
  subcomponents: {
    PopoverHeader,
  },
} as Meta;

const Template: ComponentStory<typeof Popover> = (args) => (
  <Popover {...args} />
);

export const Default = Template.bind({});
Default.args = {
  trigger: <Button size="small">Open Popover</Button>,
  children: <div>Content</div>,
  size: "md",
};

export const Header = Template.bind({});
Header.args = {
  trigger: <Button size="small">Open Popover</Button>,
  children: (
    <>
      <PopoverHeader title="Title" subtitle="Sub Title" />
      <div>Content</div>
    </>
  ),
  size: "md",
};

export const Loading = Template.bind({});
Loading.args = {
  trigger: <Button size="small">Open Popover</Button>,
  children: (
    <>
      <PopoverLoading />
    </>
  ),
  size: "md",
};
