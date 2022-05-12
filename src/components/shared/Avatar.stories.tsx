import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Avatar } from "./Avatar";

export default {
  title: "Shared/Avatar",
  component: Avatar,
  argTypes: {},
  decorators: [(Story) => <Story />],
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: "https://via.placeholder.com/40",
  alt: "Avatar Name",
  size: "md",
  fallback: "OG",
};

export const Empty = Template.bind({});
Empty.args = {
  ...Default.args,
  src: undefined,
};

export const EmptyFallback = Template.bind({});
EmptyFallback.args = {
  ...Default.args,
  src: undefined,
  fallback: undefined,
};
