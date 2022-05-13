import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { ReactComponent as CheckIcon } from "../../assets/images/icons/check.svg";
import { ReactComponent as NavIcon } from "../../assets/images/icons/nav.svg";
import { IconButton } from "./IconButton";

const icons = {
  CheckIcon: <CheckIcon />,
  NavIcon: <NavIcon />,
};

export default {
  title: "Shared/Icon Button",
  component: IconButton,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onClick: { action: "clicked" },
    children: {
      options: Object.keys(icons),
      mapping: icons,
      control: {
        type: "select",
        labels: {
          CheckIcon: "Check Icon",
          NavIcon: "Nav Icon",
        },
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex px-8 py-8 bg-white shadow-header dark:bg-zinc-800 dark:shadow-header-dark">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = (args) => (
  <IconButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: "CheckIcon",
};

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  loading: true,
};
