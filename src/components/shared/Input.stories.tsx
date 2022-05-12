/* eslint-disable sonarjs/no-identical-functions */
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { screen, userEvent } from "@storybook/testing-library";
import { Form, Formik } from "formik";
import React from "react";

import { ReactComponent as UserIcon } from "../../assets/images/icons/user.svg";
import { Input } from "./Input";

export default {
  title: "Shared/Input",
  component: Input,
  argTypes: {
    onClick: { action: "clicked" },
    onFocus: { action: "focused" },
    onBlur: { action: "blurred" },
    type: {
      control: {
        type: "select",
        options: ["text", "email", "password"],
      },
    },
    name: {
      control: false,
    },
    icon: {
      control: false,
    },
  },
  decorators: [
    (Story, context) => {
      const isError = context.parameters.error;
      const errorProps = isError
        ? {
            initialErrors: { foo: "Error: Lorem ipsum dolor site amet" },
            initialTouched: { foo: true },
            isInitialValid: false,
            validate: () => ({ foo: "Error: Lorem ipsum dolor site amet" }),
          }
        : {};
      return (
        <Formik onSubmit={() => {}} initialValues={{ foo: "" }} {...errorProps}>
          {() => (
            <Form>
              <Story />
            </Form>
          )}
        </Formik>
      );
    },
  ],
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;
export const Default = Template.bind({});
Default.args = {
  type: "text",
  name: "foo",
  placeholder: "Placeholder",
  icon: <UserIcon />,
};
Default.play = async ({ canvasElement, args }) => {
  const input = screen.getByPlaceholderText("Placeholder", {});
  await userEvent.type(input, "example-email@email.com", {
    delay: 100,
  });
};

export const WithoutIcon = Template.bind({});
WithoutIcon.args = {
  type: "text",
  name: "foo",
  placeholder: "Placeholder",
};

export const Error = Template.bind({});
Error.args = {
  type: "text",
  name: "foo",
  placeholder: "Placeholder",
};
Error.parameters = {
  error: true,
};
