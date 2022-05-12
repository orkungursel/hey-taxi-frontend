import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { ReactComponent as ReloadIcon } from "../../assets/images/icons/reload.svg";
import { IconButton } from "../shared/IconButton";
import { List } from "./List";
import { ListContainer } from "./ListContainer";
import { ListHeader } from "./ListHeader";
import { ListItemSkeleton } from "./ListItemSkeleton";

export default {
  title: "Content/List/Loading Skeleton",
  component: ListItemSkeleton,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
  decorators: [
    (Story) => (
      <div className="m-8">
        <ListContainer>
          <ListHeader
            heading="Taxies"
            subtitle={`4 taxies found near you`}
            tail={
              <IconButton>
                <ReloadIcon />
              </IconButton>
            }
          />
          <List>
            <Story />
          </List>
        </ListContainer>
      </div>
    ),
  ],
} as ComponentMeta<typeof ListItemSkeleton>;

const Template: ComponentStory<typeof ListItemSkeleton> = (args) => (
  <ListItemSkeleton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  count: 4,
  displayImage: true,
};
