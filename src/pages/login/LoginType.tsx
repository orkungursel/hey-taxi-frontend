import { useParams } from "react-router-dom";

export enum LoginType {
  Driver = "driver",
  Fare = "fare",
}
export const useLoginType = () => {
  const { type } = useParams<{ type: LoginType }>();
  return type ?? LoginType.Driver;
};
