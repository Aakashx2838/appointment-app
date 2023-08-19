import { BiCheck } from "react-icons/bi";

import { SortOption } from "../../constants/sort-options";

interface IOptionItemProps {
  option: SortOption;
  isSelected: boolean;
  setSelected: (opt: SortOption) => void;
}

export default function OptionItem({
  option,
  isSelected = false,
  setSelected,
}: IOptionItemProps) {
  return (
    <li
      className="flex items-center justify-between px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900"
      onClick={() => setSelected(option)}
    >
      <span>{option.label}</span>
      {isSelected ? <BiCheck /> : null}
    </li>
  );
}
