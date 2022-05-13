import classNames from "classnames";
import { useCallback, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { buildRoutePathWithParams, RoutePath } from "../../app/routes";
import { ReactComponent as SwitchIcon } from "../../assets/images/icons/switch.svg";
import { ReactComponent as LogoVerticalSvg } from "../../assets/images/logo-vertical.svg";
import { Button } from "../../components/shared/Button";
import { LoadingSpinner } from "../../components/shared/LoadingSpinner";
import { MessageBox } from "../../components/shared/MessageBox";
import { useAppDispatch } from "../../lib/store";
import {
  AuthStatus,
  LoginAsync,
  SetError,
  useAuthError,
  useAuthStatus,
} from "../../lib/store/auth/authSlice";
import { LoginForm, SubmitHandler } from "./LoginForm";
import { LoginType, useLoginType } from "./LoginType";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const authStatus = useAuthStatus();
  const loginType = useLoginType();

  const onSubmit: SubmitHandler = useCallback(
    (values) => {
      if (authStatus === AuthStatus.Loading) {
        return;
      }

      console.log(loginType);
      dispatch(LoginAsync({ email: values.email, password: values.password }));
    },
    [dispatch, authStatus, loginType],
  );

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className={wrapperClasses}>
        <section className={boxClasses}>
          <LoginHeader />
          <LoginForm
            onSubmit={onSubmit}
            header={<LoginError />}
            footer={<LoginFooter />}
          />
        </section>
      </div>
    </>
  );
}

function LoginHeader() {
  return (
    <div className="flex items-center justify-between">
      <LoginLogo />
      <LoginTypeSelector />
    </div>
  );
}

function LoginFooter() {
  const authStatus = useAuthStatus();
  return (
    <div className="flex gap-2 items-center mt-6">
      <Button type="submit" color="primary">
        {authStatus === AuthStatus.Loading ? (
          <LoadingSpinner size="md" color="invert" />
        ) : (
          "Login"
        )}
      </Button>
    </div>
  );
}

function LoginError() {
  const error = useAuthError();
  const dispatch = useDispatch();

  if (!error) {
    return null;
  }

  return (
    <MessageBox
      type="error"
      message={error}
      onClose={() => dispatch(SetError())}
    />
  );
}

function LoginTypeSelector() {
  const navigate = useNavigate();
  const loginType = useLoginType();

  const switchLoginType = useCallback(() => {
    const type =
      loginType === LoginType.Driver ? LoginType.Fare : LoginType.Driver;

    navigate(buildRoutePathWithParams(RoutePath.LoginWithType, { type }), {
      replace: true,
    });
  }, [navigate, loginType]);

  const loginTypeTitle = useMemo(() => {
    switch (loginType) {
      case LoginType.Driver:
        return "Driver";
      case LoginType.Fare:
        return "Fare";
    }
  }, [loginType]);

  return (
    <div className="text-2xl md:text-3xl text-zinc-400 font-semibold text-right">
      Login as{" "}
      <strong onClick={switchLoginType} className={loginTypeSelectorClasses}>
        <span>{loginTypeTitle}</span>
        <SwitchIcon />
      </strong>
    </div>
  );
}

function LoginLogo() {
  return (
    <div>
      <LogoVerticalSvg className="h-16" />
    </div>
  );
}

const wrapperClasses = classNames(
  "relative flex flex-col items-center justify-center",
  "px-4 py-8 gap-10 md:gap-16 min-h-screen",
  "bg-cover bg-center bg-no-repeat",
  "dark:bg-zinc-700 dark:text-zinc-100",
  "before:absolute before:h-12 before:bg-primary-yellow-darker before:w-full before:z-0",
  "overflow-hidden",
);

const boxClasses = classNames(
  "relative z-10",
  "flex flex-col items-stretch",
  "w-full max-w-2xl md:mx-auto p-12 gap-9",
  "border border-gray-200",
  "bg-white text-zinc-900",
  "shadow-smooth",
  "dark:bg-zinc-800 dark:text-zinc-100",
  "dark:border-0",
  "dark:shadow-smooth-dark",
  "rounded-md",
);

const loginTypeSelectorClasses = classNames(
  "inline-flex items-center gap-1",
  "underline cursor-pointer",
  "text-zinc-900",
  "dark:text-white",
  "border-2 border-transparent",
  "hover:border-zinc-800 dark:hover:border-white",
  "px-2 py-1 -ml-2",
  "rounded-md",
  "select-none",
);
