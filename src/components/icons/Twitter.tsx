import { memo } from 'react';

function _Twitter({
  width,
  height,
  className = '',
}: {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 32 32"
    >
      <path
        d="M18.5884 13.856L28.7144 2H26.3144L17.5244 12.294L10.5004 2H2.40039L13.0204 17.568L2.40039 30H4.80039L14.0844 19.128L21.5024 30H29.6024L18.5884 13.856ZM15.3024 17.704L14.2264 16.154L5.66439 3.82H9.35039L16.2584 13.774L17.3344 15.324L26.3164 28.264H22.6304L15.3024 17.704Z"
        fill="black"
      />
    </svg>
  );
}

export const Twitter = memo(_Twitter);
