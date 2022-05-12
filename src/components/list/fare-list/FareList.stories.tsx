import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { ReactComponent as ReloadIcon } from "../../../assets/images/icons/reload.svg";
import { IconButton } from "../../shared/IconButton";
import { List } from "../List";
import { ListContainer } from "../ListContainer";
import { ListHeader } from "../ListHeader";
import { FareListItem, FareListItemProps } from "./FareList";

export default {
  title: "Content/List/Fare List",
  component: List,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
  decorators: [
    (Story) => (
      <div className="m-8">
        <Story />
      </div>
    ),
  ],
  subcomponents: {
    VehicleListItem: FareListItem,
  },
} as ComponentMeta<typeof List>;

const Template: ComponentStory<typeof List> = (args) => {
  const [selectedId, setSeletedId] = React.useState<string | undefined>();

  const onClick = React.useCallback(
    (id: string) => {
      if (id === selectedId) {
        setSeletedId(undefined);
        return;
      }
      setSeletedId(id);
    },
    [selectedId],
  );

  return (
    <ListContainer>
      <ListHeader
        heading="Call Requests"
        subtitle={`${items.length} requests found`}
        tail={
          <IconButton>
            <ReloadIcon />
          </IconButton>
        }
      />
      <List {...args}>
        {items.map((item) => {
          return (
            <FareListItem
              key={item.id}
              isSelected={selectedId === item.id}
              onClick={onClick}
              {...item}
            />
          );
        })}
      </List>
    </ListContainer>
  );
};

const onClickActionButton = (id: string) => {
  alert("[onClickActionButton] id: " + id);
};

const items: Omit<FareListItemProps, "onClick">[] = [
  {
    id: "1",
    name: "Bernice Gerlach",
    distance: 1.2,
    onClickActionButton,
  },
  {
    id: "2",
    name: "Jessie Doyle",
    distance: 3.5,
    onClickActionButton,
  },
  {
    id: "3",
    name: "Clifford D'Amore",
    distance: 5.7,
    onClickActionButton,
  },
  {
    id: "4",
    name: "Marc Bins",
    distance: 10.1,
    onClickActionButton,
  },
];

export const Default = Template.bind({});
Default.args = {};
