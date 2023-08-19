import { useContext, useState } from "react";
import { AppointmentContext } from "../../context/appointment-context";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import Button from "../ui/button";
import Input from "../ui/input";

import { BiCalendarPlus } from "react-icons/bi";

import { postAppointment } from "../../services/post-appointment";

const addAppointmentSchema = z.object({
  owner_name: z.string().nonempty(),
  pet_name: z.string().nonempty(),
  apt_date: z.string().nonempty(),
  apt_time: z.string().nonempty(),
  apt_notes: z.string().nonempty(),
});

export type AddAppointmentForm = z.infer<typeof addAppointmentSchema>;

export default function AddAppointment() {
  const [isAdding, setIsAdding] = useState(false);

  const { setAppointments } = useContext(AppointmentContext);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<AddAppointmentForm>({
    resolver: zodResolver(addAppointmentSchema),
    mode: "all",
  });

  const onSubmit: SubmitHandler<AddAppointmentForm> = async (data) => {
    setIsAdding(true);
    const addedAppointment = await postAppointment(data);
    setAppointments(
      (prevAppointments) =>
        prevAppointments && [addedAppointment, ...prevAppointments],
    );
    reset();
    setIsAdding(false);
  };

  return (
    <details>
      <summary className="flex items-center w-full gap-2 px-2 py-3 font-thin text-left text-white bg-blue-400 rounded-md cursor-pointer select-none">
        <BiCalendarPlus />
        Add Appointment
      </summary>
      <form
        className="p-4 space-y-5 border border-t-0 border-gray-300 rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Owner Name"
          error={errors.owner_name?.message}
          register={register}
          id="owner_name"
        />
        <Input
          label="Pet Name"
          error={errors.pet_name?.message}
          register={register}
          id="pet_name"
        />
        <Input
          label="Apt Date"
          error={errors.apt_date?.message}
          type="date"
          register={register}
          id="apt_date"
        />
        <Input
          label="Apt Time"
          error={errors.apt_time?.message}
          type="time"
          register={register}
          id="apt_time"
        />
        <Input
          label="Appointment Notes"
          placeholder="Detailed comments about the condition"
          as="textarea"
          error={errors.apt_notes?.message}
          register={register}
          id="apt_notes"
        />
        <div className="flex items-center justify-end">
          <Button label="Submit" type="submit" isLoading={isAdding} />
        </div>
      </form>
    </details>
  );
}
