import cn from "classnames";

import { UseFormRegister } from "react-hook-form";

type IInputProps = {
  error?: string;
  register: UseFormRegister<any>;
  id: string;
  as?: "textarea";
  label: string;
  placeholder?: string;
  type?: "text" | "date" | "time";
};

export default function Input({
  error,
  register,
  id,
  as,
  label,
  placeholder,
  type,
}: IInputProps) {
  return (
    <fieldset className="flex items-center gap-4">
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-700 min-w-[33.33%]"
      >
        <span>{label}</span>
      </label>
      {as === "textarea" ? (
        <textarea
          className={cn("input", {
            "border-red-500": !!error,
          })}
          rows={3}
          placeholder={placeholder}
          {...register(id)}
        />
      ) : (
        <input
          className={cn("sm:max-w-xs input", {
            "border-red-500": !!error,
          })}
          placeholder={placeholder}
          type={type}
          {...register(id)}
        />
      )}
    </fieldset>
  );
}
