export enum VehicleClass {
  Economy = "economy",
  Luxury = "luxury",
  Business = "business",
}

export enum VehicleType {
  Sedan = "sedan",
  SUV = "suv",
  Hatchback = "hatchback",
  Coupe = "coupe",
  Convertible = "convertible",
  Pickup = "pickup",
  Cabriolet = "cabriolet",
  Minivan = "minivan",
  Van = "van",
  Jeep = "jeep",
  Bus = "bus",
  Truck = "truck",
  Motorcycle = "motorcycle",
  Other = "other",
}

export interface Vehicle {
  id: string;
  name: string;
  plate: string;
  type: VehicleType;
  class: VehicleClass;
  seats: number;
}
