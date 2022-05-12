import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { ReactComponent as ReloadIcon } from "../../assets/images/icons/reload.svg";
import { Button } from "./Button";
import { EmptyState } from "./EmptyState";

export default {
  title: "Shared/Empty State",
  component: EmptyState,
  argTypes: {},
  decorators: [(Story) => <Story />],
} as ComponentMeta<typeof EmptyState>;

const Template: ComponentStory<typeof EmptyState> = (args) => (
  <EmptyState {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "No vehicles found",
  subtitle: "Try changing your location",
  icon: <ReloadIcon className="w-12 h-12" />,
};

export const WithContent = Template.bind({});
WithContent.args = {
  ...Default.args,
  children: <Button size="medium">Button</Button>,
};
