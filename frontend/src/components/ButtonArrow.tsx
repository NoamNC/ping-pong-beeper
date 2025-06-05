import { cn } from "clsx-for-tailwind";

const ButtonArrow = ({
  icon,
  className,
  onClick,
}: {
  icon: string;
  className?: string;
  onClick?: () => void;
}) => {
  const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick && onClick();
  };
  return (
    <button
      onClick={handleClick}
      className={cn(
        "bg-black ",
        "border border-white  rounded",
        "flex items-center justify-center ",
        "text-white",
        className
      )}
    >
      {icon}
    </button>
  );
};

export default ButtonArrow;
