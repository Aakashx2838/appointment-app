import { BiCalendar } from "react-icons/bi";

export default function Header() {
  return (
    <h1 className="flex items-center text-3xl font-thin md:text-5xl">
      <BiCalendar className="text-red-600" />
      Appointment System
    </h1>
  );
}
