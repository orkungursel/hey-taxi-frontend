import classNames from "classnames";

import { ReactComponent as CloseIcon } from "../../assets/images/icons/close.svg";

type MessageBoxType = "error" | "success" | "info" | "warning";

interface MessageBoxCloseButtonProps {
  type: MessageBoxType;
  onClose?: () => void;
}

interface MessageBoxProps extends MessageBoxCloseButtonProps {
  type: MessageBoxType;
  message?: string;
}

export function MessageBox(props: MessageBoxProps) {
  const messageBoxTitle = getMessageBoxTitle(props.type);
  const messageBoxColorClasses = getMessageBoxColorClasses(props.type);

  return (
    <div
      className={classNames(messageBoxClasses, messageBoxColorClasses)}
      role="alert"
    >
      <div>
        {messageBoxTitle && (
          <span className="font-medium">{messageBoxTitle}</span>
        )}
        <span className="ml-1">{props.message}</span>
      </div>
      {props.onClose && (
        <MessageBoxCloseButton type={props.type} onClose={props.onClose} />
      )}
    </div>
  );
}

function MessageBoxCloseButton(props: MessageBoxCloseButtonProps) {
  const messageBoxCloseButtonColorClasses =
    getMessageBoxCloseButtonColorClasses(props.type);

  return (
    <button
      type="button"
      className={classNames(
        messageBoxCloseButtonClasses,
        messageBoxCloseButtonColorClasses,
      )}
      aria-label="Close"
      onClick={props.onClose}
    >
      <span className="sr-only">Close</span>
      <CloseIcon />
    </button>
  );
}

function getMessageBoxTitle(type?: string) {
  switch (type) {
    case "error":
      return "Error:";
    case "success":
      return "Success:";
    case "info":
      return "Info:";
    case "warning":
      return "Warning:";
    default:
      return "";
  }
}

function getMessageBoxColorClasses(type?: string) {
  switch (type) {
    case "error":
      return "bg-red-500 text-white";
    case "success":
      return "bg-green-500 text-white";
    case "info":
      return "bg-blue-500 text-white";
    case "warning":
      return "bg-orange-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
}

function getMessageBoxCloseButtonColorClasses(type?: string) {
  switch (type) {
    default:
    case "error":
      return classNames(
        "bg-red-100 text-red-500",
        "focus:ring-2 focus:ring-red-400",
        "hover:bg-red-200",
        "dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300",
      );
    case "success":
      return classNames(
        "bg-green-100 text-green-500",
        "focus:ring-2 focus:ring-green-400",
        "hover:bg-green-200",
        "dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300",
      );
    case "info":
      return classNames(
        "bg-blue-100 text-blue-500",
        "focus:ring-2 focus:ring-blue-400",
        "hover:bg-blue-200",
        "dark:bg-blue-200 dark:text-blue-600 dark:hover:bg-blue-300",
      );
    case "warning":
      return classNames(
        "bg-orange-100 text-orange-500",
        "focus:ring-2 focus:ring-orange-400",
        "hover:bg-orange-200",
        "dark:bg-orange-200 dark:text-orange-600 dark:hover:bg-orange-300",
      );
  }
}

const messageBoxClasses = classNames(
  "p-4 mb-6 rounded-md flex justify-between",
);

const messageBoxCloseButtonClasses = classNames(
  "inline-flex h-8 w-8",
  "ml-auto -mx-1.5 -my-1.5 p-1.5",
  "rounded-lg",
);
