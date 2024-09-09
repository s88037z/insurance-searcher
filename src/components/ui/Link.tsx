import { Link as RouterLink, LinkProps } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export const Link = ({ className, children, ...props }: LinkProps) => {
  return (
    <RouterLink
      className={twMerge("text-blue-600 hover:text-blue-900", className)}
      {...props}
    >
      {children}
    </RouterLink>
  );
};
