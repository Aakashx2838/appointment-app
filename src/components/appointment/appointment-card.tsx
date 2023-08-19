import { useContext, useState } from "react";
import { AppointmentContext } from "../../context/appointment-context";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import DeleteAppointmentButton from "./delete-appointment-button";
import EditDateTime from "./edit-date-time";
import EditableField from "./editable-field";

import { BiSave } from "react-icons/bi";
import { ImSpinner2 } from "react-icons/im";

import { updateAppointment } from "../../services/update-appointment";

interface IAppointmentCardProps {
  id: number;
  pet_name: string;
  owner_name: string;
  apt_date: string;
  apt_notes: string;
}

const updateAppointmentSchema = z.object({
  id: z.number(),
  owner_name: z.string().nonempty(),
  pet_name: z.string().nonempty(),
  apt_date: z.string().nonempty(),
  apt_time: z.string().nonempty(),
  apt_notes: z.string().nonempty(),
});

export type UpdateAppointmentForm = z.infer<typeof updateAppointmentSchema>;

export default function AppointmentCard({
  id,
  pet_name,
  owner_name,
  apt_date,
  apt_notes,
}: IAppointmentCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const { setAppointments } = useContext(AppointmentContext);

  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<UpdateAppointmentForm>({
    resolver: zodResolver(updateAppointmentSchema),
    mode: "all",
    defaultValues: {
      id,
      pet_name,
      owner_name,
      apt_date: apt_date.split("T")[0],
      apt_time: apt_date.split("T")[1].slice(0, -8),
      apt_notes,
    },
  });

  const onSubmit: SubmitHandler<UpdateAppointmentForm> = async (data) => {
    if (!isDirty) return;
    setIsEditing(true);
    const updatedAppointment = await updateAppointment(data);
    setAppointments((prevAppointments) =>
      prevAppointments?.map((appointment) =>
        appointment.id === updatedAppointment.id
          ? updatedAppointment
          : appointment,
      ),
    );
    setIsEditing(false);
  };

  return (
    <li className="flex items-start gap-2 px-3 py-3">
      <div className="flex flex-col flex-none">
        <DeleteAppointmentButton id={id} />
        <button
          type="button"
          className="p-1.5 mt-1 rounded text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={handleSubmit(onSubmit)}
        >
          {isEditing ? <ImSpinner2 className="animate-spin" /> : <BiSave />}
        </button>
      </div>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <EditableField
            data={pet_name}
            className="text-2xl font-medium text-blue-500"
            register={register}
            id="pet_name"
            error={errors.pet_name?.message}
          />
          <EditDateTime
            data={apt_date}
            register={register}
            error={errors.apt_date?.message || errors.apt_time?.message}
          />
        </div>
        <div className="flex items-center gap-2 font-thin">
          <b className="font-bold text-blue-500">Owner:</b>
          <EditableField
            data={owner_name}
            register={register}
            id="owner_name"
            error={errors.owner_name?.message}
          />
        </div>
        <EditableField
          data={apt_notes}
          className="font-thin leading-tight"
          as="textarea"
          register={register}
          id="apt_notes"
          error={errors.apt_notes?.message}
        />
      </div>
    </li>
  );
}
