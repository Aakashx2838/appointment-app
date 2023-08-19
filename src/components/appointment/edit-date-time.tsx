import { useState } from "react";

import { UseFormRegister } from "react-hook-form";

import cn from "classnames";

import { BiPencil, BiPlus } from "react-icons/bi";

interface IEditDateTimeProps {
  data: string;
  className?: string;
  register: UseFormRegister<any>;
  error?: string;
  close?: boolean;
}

export default function EditDateTime({
  data,
  className,
  register,
  error,
}: IEditDateTimeProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex items-end flex-shrink-0 gap-1">
      {isEditing ? (
        <div className="w-min sm:w-fit">
          <input
            type="date"
            className={cn(
              "text-xs sm:text-sm md:text-base border-b border-black outline-none w-fit",
              className,
              {
                "border-red-500": !!error,
              },
            )}
            {...register("apt_date")}
          />
          <input
            type="time"
            className={cn(
              "text-xs sm:text-sm md:text-base border-b border-black outline-none",
              className,
              {
                "border-red-500": !!error,
              },
            )}
            {...register("apt_time")}
          />
        </div>
      ) : (
        <span
          className={cn("text-xs sm:text-sm md:text-base font-thin", className)}
        >
          {data.replace("T", " ").slice(0, -8)}
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
