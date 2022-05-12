import axios from "axios";

import { Vehicle } from "../../models/Vehicle";
import { vehicleApi } from "./base";

export async function GetVehicles(token: string) {
  try {
    const { data } = await vehicleApi.get<Vehicle[]>("/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }

    throw error;
  }
}

export async function GetVehicle(token: string, id: string) {
  try {
    if (!id) {
      throw new Error("Missing vehicle id");
    }

    const { data } = await vehicleApi.get<Vehicle>(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }

    throw error;
  }
}

type CreateVehicleRequest = Omit<Vehicle, "id">;

export async function CreateVehicle(
  token: string,
  request: CreateVehicleRequest,
) {
  try {
    const { data } = await vehicleApi.post<Vehicle>(`/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: request,
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }

    throw error;
  }
}

export async function DeleteVehicle(token: string, id: string) {
  try {
    if (!id) {
      throw new Error("Missing vehicle id");
    }

    const { data } = await vehicleApi.delete(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }

    throw error;
  }
}
