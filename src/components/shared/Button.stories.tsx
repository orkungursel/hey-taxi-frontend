import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Button } from "./Button";

export default {
  title: "Shared/Button",
  component: Button,
  argTypes: {},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Primary",
  color: "primary",
  size: "medium",
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: "Secondary",
  color: "secondary",
  size: "medium",
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  children: "Tertiary",
  color: "tertiary",
  size: "medium",
};
