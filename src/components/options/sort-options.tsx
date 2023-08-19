import { useContext, useState } from "react";
import { AppointmentContext } from "../../context/appointment-context";

import OptionItem from "./option-item";

import { BiCaretDown } from "react-icons/bi";

import { sort_options, sort_order } from "../../constants/sort-options";

export default function SortOptions() {
  const [isShowing, setIsShowing] = useState(false);

  const { query, setQuery } = useContext(AppointmentContext);

  return (
    <div>
      <button
        className="absolute inset-y-0 right-0 flex items-center gap-2 px-4 py-2 font-thin text-white bg-blue-400 border-2 border-blue-400 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2"
        onClick={() => setIsShowing(!isShowing)}
      >
        Sort By
        <BiCaretDown />
      </button>

      {isShowing ? (
        <div className="absolute right-0 w-full mt-2 origin-top-right bg-white rounded-md shadow-lg max-w-[224px] py-1 font-thin divide-y-2 border border-gray-300/50">
          <ul>
            {sort_options.map((option) => (
              <OptionItem
                key={option.id}
                option={option}
                isSelected={query.sortBy.id === option.id}
                setSelected={(option) => setQuery({ ...query, sortBy: option })}
              />
            ))}
          </ul>
          <ul>
            {sort_order.map((option) => (
              <OptionItem
                key={option.id}
                option={option}
                isSelected={query.sortOrder.id === option.id}
                setSelected={(option) =>
                  setQuery({ ...query, sortOrder: option })
                }
              />
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
