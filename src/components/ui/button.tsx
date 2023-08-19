import { ImSpinner2 } from "react-icons/im";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isLoading?: boolean;
}

export default function Button({ label, isLoading, ...props }: IButtonProps) {
  return (
    <button
      {...props}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-400 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2"
    >
      {label ? label : "Button"}
      {isLoading && <ImSpinner2 className="animate-spin" />}
    </button>
  );
}
