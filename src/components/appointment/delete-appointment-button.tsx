import { useContext, useState } from "react";
import { AppointmentContext } from "../../context/appointment-context";

import { BiTrash } from "react-icons/bi";
import { ImSpinner2 } from "react-icons/im";

import { deleteAppointment } from "../../services/delete-appointment";

export default function DeleteAppointmentButton({ id }: { id: number }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const { setAppointments } = useContext(AppointmentContext);

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    await deleteAppointment(id);
    setAppointments(
      (prev) => prev && prev.filter((appointment) => appointment.id !== id),
    );
    setIsDeleting(false);
  };
  return (
    <button
      type="button"
      className="p-1.5 mt-1 rounded text-white bg-red-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      onClick={() => handleDelete(id)}
    >
      {isDeleting ? <ImSpinner2 className="animate-spin" /> : <BiTrash />}
    </button>
  );
}
