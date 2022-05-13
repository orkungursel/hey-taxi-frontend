import classNames from "classnames";
import { Link } from "react-router-dom";

import { RoutePath } from "../../app/routes";
import { HeaderDriverStatus } from "../../features/header-driver-status";
import { HeaderUserCard } from "../../features/header-user-card";
import { HeaderLogo } from "./HeaderLogo";

export interface HeaderProps {
  absolute?: boolean;
}

export function Header(props: HeaderProps) {
  return (
    <header
      className={classNames(
        headerClasses,
        props.absolute && headerAbsoluteClasses,
      )}
    >
      <HeaderLeft />
      <HeaderRight />
    </header>
  );
}

function HeaderLeft() {
  return (
    <div>
      <Link to={RoutePath.Home}>
        <HeaderLogo />
      </Link>
    </div>
  );
}

function HeaderRight() {
  return (
    <div className={headerRightClasses}>
      <HeaderDriverStatus />
      <HeaderUserCard />
    </div>
  );
}

const headerClasses = classNames(
  "flex items-center justify-between",
  "w-full px-6 py-6 z-30",
  "text-zinc-900 bg-white bg-opacity-90",
  "shadow-header",
  "dark:text-zinc-100 dark:bg-zinc-800 dark:bg-opacity-90",
  "dark:shadow-header-dark",
);

const headerAbsoluteClasses = classNames("absolute left-0 top-0 right-0");

const headerRightClasses = classNames("flex gap-2 items-center");
