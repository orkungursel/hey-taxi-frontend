import classNames from "classnames";

export function Map() {
  return <div className={mapClases}></div>;
}
const mapClases = classNames(
  "w-full h-screen",
  "bg-cover bg-center bg-no-repeat",
  "bg-gray-200",
  "bg-login-background-image",
  "dark:bg-gray-dark",
  "dark:bg-login-background-image-dark",
);
