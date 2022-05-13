import classNames from "classnames";
import { lazy, Suspense, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { RoutePath } from "../../app/routes";
import { ReactComponent as LogoVerticalSvg } from "../../assets/images/logo-vertical.svg";
import { Button } from "../../components/shared/Button";

const SplashHandImage = lazy(() => import("./SplashHandImage"));

export default function SplashPage() {
  return (
    <div className={wrapperClasses}>
      <SplashPageBackgroundCircles />
      <SplashPageContents />
      <Suspense>
        <SplashHandImage />
      </Suspense>
    </div>
  );
}

const SplashPageContents = () => {
  return (
    <>
      <SplashPageLogo />
      <SplashPageTitle />
      <SplashPageCTAButton />
    </>
  );
};

export const SplashPageBackgroundCircles = () => {
  return (
    <>
      <div
        className={classNames(
          circleClasses,
          "h-[100%] md:h-[140%] border-[calc(100vh*0.02)] z-[2]",
        )}
      />
      <div
        className={classNames(
          circleClasses,
          "h-[90%] md:h-[120%] border-[calc(100vh*0.015)] z-[0]",
        )}
      />
      <div
        className={classNames(
          circleClasses,
          "h-[80%] md:h-[100%] border-[calc(100vh*0.01)] z-[0]",
        )}
      />
    </>
  );
};

function SplashPageLogo() {
  return <LogoVerticalSvg className="h-36 md:h-48 z-10" />;
}

function SplashPageCTAButton() {
  const navigate = useNavigate();

  const navigateToLogin = useCallback(() => {
    navigate(RoutePath.Login);
  }, [navigate]);

  return (
    <Button
      onClick={navigateToLogin}
      className="z-10 transition-all hover:scale-110 shadow-smooth dark:shadow-smooth-dark"
      data-testid="Splash-CTA-Button"
    >
      Let&apos;s start
    </Button>
  );
}

function SplashPageTitle() {
  return (
    <h1
      className="text-6xl md:text-8xl font-normal text-center md:tracking-tight z-10"
      data-testid="Splash-Title"
    >
      Find <strong className="font-black">a taxi</strong>
      <br />
      near me
    </h1>
  );
}

const wrapperClasses = classNames(
  "relative flex flex-col items-center justify-center",
  "py-8 gap-10 md:gap-16 min-h-screen",
  "bg-gradient-radial",
  "bg-primary-500 from-primary-300",
  "dark:text-primary-500",
  "dark:bg-zinc-900 dark:from-zinc-700",
  "overflow-hidden",
);

const circleClasses = classNames(
  "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
  "pointer-events-none",
  "aspect-square",
  "rounded-full",
  "border-primary-yellow-darker",
  "dark:border-zinc-900",
);
