import classNames from "classnames";

import { ReactComponent as LogoHorizontalSvg } from "../../assets/images/logo-horizontal.svg";

export function HeaderLogo() {
  return <LogoHorizontalSvg className={logoClasses} />;
}

export const logoClasses = classNames(
  "h-8",
  "flex-shrink-0",
  "mr-4",
  "dark:text-primary-yellow",
);
