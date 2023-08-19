import { IAppointment } from "../../types";

import AppointmentCard from "./appointment-card";

interface IAppointmentSectionProps {
  appointments: IAppointment[];
}

export default function AppointmentSection({
  appointments,
}: IAppointmentSectionProps) {
  return (
    <div>
      <ul className="divide-y divide-gray-200">
        {appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            id={appointment.id}
            pet_name={appointment.pet_name}
            owner_name={appointment.owner_name}
            apt_date={appointment.apt_date}
            apt_notes={appointment.apt_notes}
          />
        ))}
        {appointments.length === 0 ? (
          <li className="px-3 py-3">No appointments</li>
        ) : null}
      </ul>
    </div>
  );
}
