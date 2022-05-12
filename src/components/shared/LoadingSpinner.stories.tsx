import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { LoadingSpinner } from "./LoadingSpinner";

export default {
  title: "Shared/Loading Spinner",
  component: LoadingSpinner,
  argTypes: {},
} as ComponentMeta<typeof LoadingSpinner>;

const Template: ComponentStory<typeof LoadingSpinner> = (args) => (
  <LoadingSpinner {...args} />
);

export const Default = Template.bind({});
Default.args = {};
