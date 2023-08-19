import { useEffect, useState } from "react";

import { toast } from "react-hot-toast";

import { SortOption, SortOptions, SortOrder } from "../constants/sort-options";
import { IAppointment } from "../types";

export interface IAppointmentQuery {
  search: string;
  sortBy: SortOption;
  sortOrder: SortOption;
}

const getAppointments = async (
  q?: string,
  sortBy?: string,
  order?: string,
): Promise<IAppointment[] | []> => {
  try {
    const params = new URLSearchParams({
      q: q || "",
      sortBy: sortBy || "",
      order: order || "",
    });

    const url =
      import.meta.env.VITE_API_URL + `/appointment/all?${params.toString()}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch appointments");
    }

    const json = await res.json();

    return json.data;
  } catch (error: unknown) {
    const { message } = error as { message: string };
    toast.error(message);
    return [];
  }
};

export const useFetchAppointments = ({
  search,
  sortBy,
  sortOrder,
}: IAppointmentQuery) => {
  const [appointments, setAppointments] = useState<
    IAppointment[] | undefined
  >();

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await getAppointments(
        search,
        SortOptions[sortBy.value],
        SortOrder[sortOrder.value],
      );
      setAppointments(response);
    };

    fetchAppointments();
  }, [search, sortBy, sortOrder]);

  return { appointments, setAppointments };
};
