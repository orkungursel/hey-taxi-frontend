import classNames from "classnames";
import { FC, PropsWithChildren } from "react";

import { Header, HeaderProps } from "./Header";

interface LayoutProps {
  header?: HeaderProps;
  className?: string;
}

export const Layout: FC<PropsWithChildren<LayoutProps>> = (props) => {
  return (
    <div>
      <Header {...props.header} />
      <section className={classNames(mainClasses, props.className)} role="main">
        {props.children}
      </section>
    </div>
  );
};

const mainClasses = classNames("");
