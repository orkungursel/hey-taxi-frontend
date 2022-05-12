import * as RG from "@radix-ui/react-radio-group";
import classNames from "classnames";
import { FC, PropsWithChildren } from "react";

interface RadioGroupProps extends RG.RadioGroupProps {
  onValueChange?: (value: string) => void;
}

export const RadioGroup: FC<PropsWithChildren<RadioGroupProps>> = ({
  children,
  className,
  ...args
}) => (
  <RG.Root className={classNames(radioGroupClasses, className)} {...args}>
    {children}
  </RG.Root>
);

interface RadioGroupItemProps extends RG.RadioGroupItemProps {
  value: string;
  isRounded?: boolean;
}

export const RadioGroupItem: FC<PropsWithChildren<RadioGroupItemProps>> = ({
  value,
  children,
  className,
  isRounded,
  ...props
}) => (
  <RG.Item
    className={classNames(
      radioGroupItemClasses,
      isRounded
        ? radioGroupItemRoundedClasses
        : radioGroupItemNotRoundedClasses,
      className,
    )}
    value={value}
    {...props}
  >
    <RadioGroupIndicator>
      <RG.Indicator className={radioGroupItemIndicatorInnerClasses} />
    </RadioGroupIndicator>
    {children}
  </RG.Item>
);

RadioGroupItem.defaultProps = {
  isRounded: true,
};

interface RadioGroupIndicatorProps {}

const RadioGroupIndicator: FC<PropsWithChildren<RadioGroupIndicatorProps>> = ({
  children,
}) => {
  return <div className={radioGroupItemIndicatorClasses}>{children}</div>;
};

interface RadioGroupLabelProps {
  className?: string;
  subtitle?: React.ReactNode;
}

export const RadioGroupLabel: FC<PropsWithChildren<RadioGroupLabelProps>> = ({
  children,
  subtitle,
}) => {
  return (
    <div className={radioGroupItemLabelClasses}>
      <div className={radioGroupItemLabelTitleClasses}>{children}</div>
      {subtitle && (
        <div className={radioGroupItemLabelSubtitleClasses}>{subtitle}</div>
      )}
    </div>
  );
};

const radioGroupClasses = classNames(
  "bg-white",
  "dark:bg-transparent",
  "mt-[1px]",
);

const radioGroupItemClasses = classNames(
  "relative flex items-center justify-start text-left w-full group m-0 gap-4 outline-none",
  "radix-state-checked:z-10",
  "-mt-[1px]",
  // light
  "border-zinc-300",
  "hover:bg-zinc-400 hover:bg-opacity-10",
  "radix-state-checked:border-sky-500",
  "radix-state-checked:bg-sky-50 radix-state-checked:text-sky-500",
  // dark
  "dark:border-zinc-600",
  "dark:radix-state-checked:border-primary-900",
  "dark:radix-state-checked:bg-primary-900 dark:radix-state-checked:bg-opacity-50",
  "dark:radix-state-checked:text-primary-500",
  "dark:hover:bg-zinc-500 dark:hover:bg-opacity-10",
  // disabled
  "radix-disabled:opacity-50 radix-disabled:pointer-events-none",
);

const radioGroupItemRoundedClasses =
  "border p-4 first:rounded-t-md last:rounded-b-md";
const radioGroupItemNotRoundedClasses = "border-y px-8 py-4";

const radioGroupItemIndicatorClasses = classNames(
  "w-4 h-4 flex flex-shrink-0 items-center justify-center",
  "border-2 rounded-full",
  "outline-1 outline-offset-2",
  "group-focus:outline group-hover:outline",
  // light
  "border-zinc-500 group-radix-state-checked:border-sky-500",
  "outline-sky-500 group-hover:outline-zinc-300 group-hover:group-focus:outline-sky-500",
  // dark
  "dark:border-zinc-500 dark:group-radix-state-checked:border-primary-500",
  "dark:outline-primary-500 dark:group-hover:outline-primary-900 dark:group-hover:group-focus:outline-primary-500",
);

const radioGroupItemIndicatorInnerClasses = classNames(
  "w-2 h-2 rounded-full",
  "bg-sky-500",
  "dark:bg-primary-500",
);

const radioGroupItemLabelClasses = classNames("flex flex-col items-start");
const radioGroupItemLabelTitleClasses = classNames("text-left font-medium");
const radioGroupItemLabelSubtitleClasses = classNames(
  "text-left",
  "mt-0.5 text-sm",
  "text-zinc-400",
  "dark:text-zinc-500",
  "group-radix-state-checked:text-sky-400",
  "dark:group-radix-state-checked:text-primary-700",
);
