import { ComponentStory, Meta } from "@storybook/react";
import React from "react";

import { Button } from "./Button";
import { Modal, ModalClose, ModalHeader, ModalLoading } from "./Modal";

export const StoryModalHeader = (
  <ModalHeader
    title="Lorem ipsum dolor sit amet"
    subtitle="Amet nostrud sint est duis. Nisi mollit Lorem cillum minim duis. Eu exercitation non cillum nisi esse ex enim."
  />
);

export default {
  title: "Shared/Modal",
  component: Modal,
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
    ModalHeader,
  },
  excludeStories: ["StoryModalHeader"],
} as Meta;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Default = Template.bind({});
Default.args = {
  trigger: <Button size="small">Open Modal</Button>,
  children: <div>Content</div>,
  defaultOpen: true,
};

export const Header = Template.bind({});
Header.args = {
  ...Default.args,
  children: (
    <>
      {StoryModalHeader}
      <div>Content</div>
    </>
  ),
};

export const WithLongContent = Template.bind({});
WithLongContent.args = {
  ...Default.args,
  children: (
    <>
      {StoryModalHeader}
      {Array.from({ length: 20 }).map((_, i) => (
        <p key={i} className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis
          lorem ut libero malesuada feugiat.
        </p>
      ))}
      <ModalClose asChild={true}>
        <Button size="small" className="mt-4">
          Ok, thanks!
        </Button>
      </ModalClose>
    </>
  ),
};

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  children: (
    <>
      <ModalLoading />
    </>
  ),
};
