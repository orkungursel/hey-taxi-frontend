import * as AvatarPrimitive from "@radix-ui/react-avatar";
import classNames from "classnames";
import { FC, useMemo } from "react";

type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps {
  src?: string;
  alt?: string;
  className?: string;
  size?: AvatarSize;
  fallback?: string;
  delayMs?: number;
}

export const Avatar: FC<AvatarProps> = ({
  src,
  alt,
  className,
  fallback,
  size,
  delayMs,
}) => {
  const fallbackName = useMemo(() => {
    if (!fallback) {
      return getFirstLetters(alt);
    }

    // get first letters of name
    if (typeof fallback === "string") {
      return getFirstLetters(fallback);
    }

    return undefined;
  }, [fallback, alt]);

  return (
    <AvatarPrimitive.Root
      className={classNames(className, avatarRootClasses, getSizeClasses(size))}
    >
      <AvatarPrimitive.Image
        src={src}
        alt={alt}
        className={avatarImageClasses}
        draggable={false}
      />
      <AvatarPrimitive.Fallback
        className={avatarFallbackClasses}
        delayMs={delayMs}
      >
        {fallbackName}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
};

Avatar.defaultProps = {
  delayMs: 600,
};

function getFirstLetters(input?: string): string {
  const str = input?.trim();

  if (typeof str !== "string" || str.length === 0) {
    return "";
  }

  const words = str.split(" ");

  if (words.length === 1 && words[0].length > 1) {
    return words[0].substring(0, 2).toUpperCase();
  }

  const firstLetters = words.map((word) => word[0].toUpperCase());
  return firstLetters.join("");
}

function getSizeClasses(size?: AvatarSize) {
  switch (size) {
    case "sm":
      return classNames("h-6 w-6");
    default:
    case "md":
      return classNames("h-10 w-10");
    case "lg":
      return classNames("h-16 w-16");
  }
}

const avatarRootClasses = classNames(
  "inline-flex items-center justify-center",
  "overflow-hidden rounded-full",
  "select-none",
  "bg-zinc-200 text-zinc-500",
  "dark:bg-zinc-900 dark:text-zinc-500",
);
const avatarImageClasses = classNames("h-full w-full object-cover");
const avatarFallbackClasses = classNames("");
