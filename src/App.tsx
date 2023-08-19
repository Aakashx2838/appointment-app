import { sort_options, sort_order } from "./constants/sort-options";

import { useState } from "react";

import AddAppointment from "./components/appointment/add-appointment";
import AppointmentSection from "./components/appointment/appointment-section";

import Header from "./components/ui/header";
import SearchInput from "./components/ui/search-input";

import { AppointmentContext } from "./context/appointment-context";
import {
  IAppointmentQuery,
  useFetchAppointments,
} from "./services/get-appointments";

function App() {
  const [query, setQuery] = useState<IAppointmentQuery>({
    search: "",
    sortBy: sort_options[0],
    sortOrder: sort_order[0],
  });

  const { appointments, setAppointments } = useFetchAppointments(query);

  return (
    <div className="py-3 space-y-3 layout">
      <Header />
      <div>
        <AppointmentContext.Provider
          value={{ appointments, setAppointments, query, setQuery }}
        >
          <AddAppointment />
          <SearchInput />
          {appointments ? (
            <AppointmentSection appointments={appointments} />
          ) : (
            <p>Loading...</p>
          )}
        </AppointmentContext.Provider>
      </div>
    </div>
  );
}

export default App;
