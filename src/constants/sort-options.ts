export enum SortOptions {
  pet_name,
  owner_name,
  apt_date,
}

export enum SortOrder {
  asc,
  desc,
}

export interface SortOption {
  id: string;
  label: string;
  value: SortOptions | SortOrder;
}

export const sort_options = [
  { id: "pName", label: "Pet Name", value: SortOptions.pet_name },
  { id: "oName", label: "Owner Name", value: SortOptions.owner_name },
  { id: "date", label: "Date", value: SortOptions.apt_date },
];

export const sort_order = [
  { id: "asc", label: "Asc", value: SortOrder.asc },
  { id: "desc", label: "Desc", value: SortOrder.desc },
];
