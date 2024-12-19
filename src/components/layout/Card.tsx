import { PropsWithChildren } from 'react';

interface Props {
  className?: string;
}

export function Card({ className, children }: PropsWithChildren<Props>) {
  return (
    <div
      className={`relative overflow-auto rounded-2xl bg-white p-1.5 xs:p-2 sm:p-3 md:p-4 ${className}`}
      style={{ ...styles.card }}
    >
      {children}
    </div>
  );
}

const styles = {
  card: {
    background: `var(--Color-fill-surface-surface, #FFF)`,
    boxShadow: `var(--Shadow-card, 0px 6px 28px rgba(0, 0, 0, 0.08))`,
  },
};
