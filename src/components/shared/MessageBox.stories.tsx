import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { MessageBox } from "./MessageBox";

export default {
  title: "Shared/Message Box",
  component: MessageBox,
  argTypes: {},
} as ComponentMeta<typeof MessageBox>;

const Template: ComponentStory<typeof MessageBox> = (args) => (
  <MessageBox {...args} />
);

export const Default = Template.bind({});
Default.args = {
  message: "This is a message.",
  type: "info",
};
