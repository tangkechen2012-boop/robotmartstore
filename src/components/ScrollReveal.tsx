import React from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const ScrollReveal = ({
  children,
  className = "",
  as: Tag = "div",
}: ScrollRevealProps) => {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    // @ts-ignore – dynamic tag with ref
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
};
