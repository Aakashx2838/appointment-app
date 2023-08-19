import { IAppointment } from "../types";

import { createContext } from "react";

import { IAppointmentQuery } from "../services/get-appointments";

interface IAppointmentContext {
  appointments: IAppointment[] | [] | undefined;
  setAppointments: React.Dispatch<
    React.SetStateAction<IAppointment[] | [] | undefined>
  >;
  query: IAppointmentQuery;
  setQuery: React.Dispatch<React.SetStateAction<IAppointmentQuery>>;
}

export const AppointmentContext = createContext<IAppointmentContext>(
  {} as IAppointmentContext,
);
