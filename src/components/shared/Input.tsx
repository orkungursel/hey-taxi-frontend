import "./Input.css";

import classNames from "classnames";
import { useField } from "formik";

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ReactNode;
}

export function Input(props: FormInputProps) {
  const { name, className, icon, ...rest } = props;
  const [field, meta] = useField(props.name);
  const hasError = meta.error && meta.touched;

  return (
    <div>
      <div className={inputWrapperClasses} tabIndex={-1}>
        {icon && <div className={inputIconClasses}>{icon}</div>}
        <input
          {...field}
          {...rest}
          className={classNames(
            className,
            inputClasses,
            icon ? inputWithIconClasses : inputWithoutIconClasses,
            hasError && inputErrorStateClasses,
          )}
        />
      </div>
      {hasError && <div className={inputErrorClasses}>{meta.error}</div>}
    </div>
  );
}

export const inputWrapperClasses = classNames(
  "relative",
  "w-full",
  "outline-none",
  "shadow-none",
  "group",
);

export const inputClasses = classNames(
  "Input",
  "w-full py-4",
  "text-xl placeholder:text-xl",
  "bg-transparent",
  "outline-none",
  "rounded-md",
  "border-2",
);

export const inputWithoutIconClasses = classNames("px-8");

export const inputWithIconClasses = classNames("pl-16 pr-8");

export const inputErrorStateClasses = classNames(
  "!border-red-500 !rounded-b-none",
);

export const inputIconClasses = classNames(
  "absolute left-5 top-0 w-8 h-full",
  "flex items-center justify-center",
  "text-zinc-300",
  "group-hover:text-black",
  "group-focus-within:text-black",
  "dark:text-zinc-400",
  "dark:group-hover:text-white",
  "dark:group-focus-within:text-white",
  "transition",
);

export const inputErrorClasses = classNames(
  "px-3 py-1",
  "text-sm",
  "rounded-b-md",
  "bg-red-500 text-white",
);
