import type { ReactNode } from "react";

interface ShellProps {
  children: ReactNode;
}

export function Shell({ children }: ShellProps) {
  return (
    <div className="h-dvh w-full overflow-hidden">
      {children}
    </div>
  );
}
