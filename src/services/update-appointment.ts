import { IAppointment } from "../types";

import { toast } from "react-hot-toast";

import { UpdateAppointmentForm } from "../components/appointment/appointment-card";

export const updateAppointment = async (
  data: UpdateAppointmentForm,
): Promise<IAppointment> => {
  const userTimezoneOffset = new Date().getTimezoneOffset() * 60000;

  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + `/appointment/update/${data.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          owner_name: data.owner_name,
          pet_name: data.pet_name,
          apt_notes: data.apt_notes,
          apt_date:
            new Date(data.apt_date + " " + data.apt_time + ":00").getTime() -
            userTimezoneOffset,
        }),
      },
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    toast.success("Appointment updated successfully.");

    return json.data;
  } catch (error) {
    const { message } = error as { message: string };
    toast.error(message);

    throw new Error("Error while updating appointment.");
  }
};
