import { useState } from "react";

import { UseFormRegister } from "react-hook-form";

import { BiPencil, BiPlus } from "react-icons/bi";

import cn from "classnames";

interface IEditableFieldProps {
  data: string;
  className?: string;
  register: UseFormRegister<any>;
  error?: string;
  id: string;
  as?: "textarea" | "input";
}

export default function EditableField({
  data,
  className,
  register,
  error,
  id,
  as = "input",
}: IEditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex items-end gap-1">
      {isEditing ? (
        <div className="w-full">
          {as === "textarea" ? (
            <textarea
              className={cn(
                "border-b border-black outline-none w-full",
                className,
                {
                  "border-red-500": !!error,
                },
              )}
              rows={3}
              {...register(id)}
            />
          ) : (
            <input
              type="text"
              className={cn(
                "border-b border-black outline-none w-full",
                className,
                {
                  "border-red-500": !!error,
                },
              )}
              {...register(id)}
            />
          )}
        </div>
      ) : (
        <span
          className={cn(
            "max-w-[100px] sm:max-w-full line-clamp-1 break-words",
            className,
          )}
        >
          {data}
        </span>
      )}
      <button
        className="mb-1 text-gray-500"
        onClick={() => setIsEditing((prev) => !prev)}
        type="button"
      >
        {isEditing ? (
          <BiPlus className="transform rotate-45" />
        ) : (
          <BiPencil size={12} />
        )}
      </button>
    </div>
  );
}
