import { toast } from "react-hot-toast";

export const deleteAppointment = async (id: number) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + `/appointment/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    toast.success("Appointment deleted successfully.");

    return json.data;
  } catch (error: unknown) {
    const { message } = error as { message: string };
    toast.error(message);
  }
};
