"use client"
import React, { type ReactNode } from "react";
import { useInView } from "react-intersection-observer";

type Direction = "up" | "down" | "right" | "left";

interface FadeInSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  direction?: Direction;
  triggerOnce?: boolean;
  duration?: number; // Duration in milliseconds
  delay?: number; // Delay in milliseconds
}

const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  direction = "right",
  className,
  triggerOnce = true,
  duration = 500,
  delay = 0,
  ...props
}) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: triggerOnce,
  });

  const animationClass = `animate-fade-in-${direction}`;

  return (
    <div
      ref={ref}
      className={`opacity-0 ${className || ""} ${
        inView ? `opacity-100 ${animationClass}` : ""
      }`}
      style={
        {
          "--animation-duration": `${duration}ms`,
          "--animation-delay": `${delay}ms`,
          ...props.style,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
