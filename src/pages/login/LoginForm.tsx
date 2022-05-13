import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import * as yup from "yup";

import { ReactComponent as PasswordIcon } from "../../assets/images/icons/password.svg";
import { ReactComponent as UserIcon } from "../../assets/images/icons/user.svg";
import { Input } from "../../components/shared/Input";
import { emailValidator, passwordValidator } from "../../utils/validators";

export interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

const validationSchema: yup.SchemaOf<LoginFormValues> = yup.object({
  email: emailValidator,
  password: passwordValidator,
});

export type SubmitHandler = (
  values: LoginFormValues,
  formikHelpers: FormikHelpers<LoginFormValues>,
) => void;

interface LoginFormProps {
  onSubmit: SubmitHandler;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const LoginForm = (props: LoginFormProps) => {
  const { onSubmit } = props;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form>
          {props.header}
          <div className="flex flex-col items-stretch gap-5">
            <Input
              name="email"
              type="email"
              placeholder="Email"
              icon={<UserIcon />}
              autoComplete="email"
              autoFocus
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="password"
              icon={<PasswordIcon />}
            />
          </div>
          {props.footer}
        </Form>
      )}
    </Formik>
  );
};

LoginForm.displayName = "LoginForm";
