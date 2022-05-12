import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { LoggedInUserCard } from "./LoggedInUserCard";

export default {
  title: "Shared/Logged-In User Card",
  component: LoggedInUserCard,
  argTypes: {
    onClick: { action: "clicked" },
  },
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="flex px-8 py-8 bg-white shadow-header dark:bg-zinc-800 dark:shadow-header-dark">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof LoggedInUserCard>;

const Template: ComponentStory<typeof LoggedInUserCard> = (args) => (
  <LoggedInUserCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  avatar: {
    src: "https://via.placeholder.com/40",
    alt: "User Avatar",
    fallback: "GW",
  },
  bigTitle: "Glen Walter",
  subtitle: "₿ 0.00424",
  arrow: true,
};
