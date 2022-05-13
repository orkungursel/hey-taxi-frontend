import classNames from "classnames";

import {
  Notification,
  useNotifications,
} from "../../lib/store/notification/notificationSlice";

export function NotificationWrapper() {
  const notification = useNotifications();

  if (!notification) {
    return null;
  }

  const colorClasses = getNotificationColorClasses(notification);

  return (
    <div
      className={classNames(
        "absolute rounded-full",
        "right-4 top-4 px-6 py-2",
        "font-bold",
        colorClasses,
      )}
    >
      {notification.message}
    </div>
  );
}

function getNotificationColorClasses(notification: Notification) {
  switch (notification.type) {
    case "success":
      return "bg-green-600 text-white";
    case "error":
      return "bg-red-600 text-white";
    case "info":
      return "bg-blue-600 text-white";
    case "warning":
      return "bg-primary-yellow text-black";
    default:
      return "bg-red-600 text-white";
  }
}
