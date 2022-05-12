import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Button } from "./Button";
import { Modal, ModalClose } from "./Modal";
import { StoryModalHeader } from "./Modal.stories";
import { Popover, PopoverHeader } from "./Popover";
import { RadioGroup, RadioGroupItem, RadioGroupLabel } from "./RadioGroup";

export default {
  title: "Shared/Radio Group",
  component: RadioGroup,
  argTypes: {
    children: {
      control: false,
    },
  },
  subcomponents: { RadioGroupItem },
  decorators: [(Story) => <Story />],
} as ComponentMeta<typeof RadioGroup>;

const Template: ComponentStory<typeof RadioGroup> = (args) => (
  <RadioGroup {...args} />
);

export const Default = Template.bind({});
Default.args = {
  defaultValue: "hello",
  children: [
    <RadioGroupItem key="1" value="hello">
      <RadioGroupLabel subtitle="Est quis labore esse pariatur magna et velit adipisicing adipisicing deserunt.">
        Occaecat consectetur
      </RadioGroupLabel>
    </RadioGroupItem>,
    <RadioGroupItem key="2" value="bar">
      Lorem sit consequat mollit aute ea velit dolore
    </RadioGroupItem>,
    <RadioGroupItem key="3" value="baz">
      Velit amet eu sunt amet qui
    </RadioGroupItem>,
  ],
};

export const OnDarkerBackground = Template.bind({});
OnDarkerBackground.args = {
  ...Default.args,
};
OnDarkerBackground.decorators = [
  (Story) => (
    <div className="bg-zinc-100 dark:bg-zinc-800 p-8">
      <Story />
    </div>
  ),
];

export const NoRounded = Template.bind({});
NoRounded.args = {
  ...Default.args,
  className: "-mx-8",
  children: [
    <RadioGroupItem key="1" isRounded={false} value="hello">
      <RadioGroupLabel
        subtitle={
          <>
            Est quis labore esse pariatur magna et{" "}
            <strong className="group-radix-state-checked:text-sky-500 dark:group-radix-state-checked:text-primary-500 underline">
              velit adipisicing
            </strong>{" "}
            adipisicing deserunt.
          </>
        }
      >
        Occaecat consectetur
      </RadioGroupLabel>
    </RadioGroupItem>,
    <RadioGroupItem key="2" isRounded={false} value="bar">
      <RadioGroupLabel>
        Lorem sit consequat mollit aute ea velit dolore
      </RadioGroupLabel>
    </RadioGroupItem>,
    <RadioGroupItem key="3" isRounded={false} value="baz" disabled={true}>
      <RadioGroupLabel>Velit amet eu sunt amet qui</RadioGroupLabel>
    </RadioGroupItem>,
  ],
};
NoRounded.decorators = [...OnDarkerBackground.decorators];

export const WithModal = Template.bind({});
WithModal.args = {
  ...NoRounded.args,
};
WithModal.decorators = [
  (Story) => (
    <Modal
      trigger={<Button size="small">Open Modal</Button>}
      defaultOpen={true}
    >
      {StoryModalHeader}
      <Story />
      <div className="flex justify-end w-full mt-8">
        <ModalClose asChild={true}>
          <Button size="small">Save Changes</Button>
        </ModalClose>
      </div>
    </Modal>
  ),
];

export const WithPopover = Template.bind({});
WithPopover.args = {
  ...NoRounded.args,
};
WithPopover.decorators = [
  (Story) => (
    <Popover size="md" trigger={<Button size="small">Open</Button>}>
      <PopoverHeader
        title="Labore amet"
        subtitle="Officia culpa elit ad anim reprehenderit. Labore laboris officia eiusmod officia voluptate voluptate aute ipsum et adipisicing exercitation aliqua est."
      />
      <Story />
    </Popover>
  ),
];
