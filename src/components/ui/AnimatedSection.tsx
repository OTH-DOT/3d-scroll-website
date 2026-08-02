"use client";

import { motion, type Variants } from "framer-motion";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export function AnimatedSection({
  children,
  className,
  ...props
}: {
  children?: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<typeof motion.div>, "children" | "initial" | "whileInView" | "viewport">) {
  const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedItem({
  children,
  className,
  ...props
}: {
  children?: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<typeof motion.div>, "children" | "variants" | "initial" | "whileInView">) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: {
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 100, damping: 20 },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}