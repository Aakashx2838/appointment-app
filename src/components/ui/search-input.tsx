import { useContext } from "react";
import { AppointmentContext } from "../../context/appointment-context";

import { BiSearch } from "react-icons/bi";

import SortOptions from "../options/sort-options";

export default function SearchInput() {
  const { query, setQuery } = useContext(AppointmentContext);

  return (
    <div className="py-6">
      <div className="relative">
        <input
          type="search"
          className="pl-8 input"
          placeholder="Search"
          value={query.search}
          onChange={(e) => setQuery({ ...query, search: e.target.value })}
        />
        <BiSearch className="absolute pointer-events-none left-3 top-[11px]" />
        <SortOptions />
      </div>
    </div>
  );
}
