import { PropsWithChildren, ReactElement } from 'react';

interface ButtonProps {
  type?: 'submit' | 'reset' | 'button';
  color?:
    | 'white'
    | 'primary'
    | 'accent'
    | 'green'
    | 'red'
    | 'gray'
    | 'sky'
    | 'blue'
    | 'pink'
    | 'mint'; // defaults to primary
  bold?: boolean;
  classes?: string;
  icon?: ReactElement;
}

export function SolidButton(
  props: PropsWithChildren<ButtonProps & React.HTMLProps<HTMLButtonElement>>,
) {
  const {
    type,
    onClick,
    color: _color,
    classes,
    bold,
    icon,
    disabled,
    title,
    ...passThruProps
  } = props;
  const color = _color ?? 'primary';

  const base =
    'flex items-center justify-center rounded-lg transition-all duration-500 active:scale-95';
  let baseColors, onHover, onActive;
  if (color === 'blue') {
    baseColors = 'bg-blue-500 text-white';
    onHover = 'hover:bg-blue-600';
    onActive = 'active:bg-blue-700';
  } else if (color === 'pink') {
    baseColors = 'bg-pink-500 text-white';
    onHover = 'hover:bg-pink-600';
    onActive = 'active:bg-pink-700';
  } else if (color === 'green') {
    baseColors = 'bg-green-500 text-white';
    onHover = 'hover:bg-green-600';
    onActive = 'active:bg-green-700';
  } else if (color === 'mint') {
    baseColors = 'bg-mint-500 text-white';
    onHover = 'hover:bg-mint-600';
    onActive = 'active:bg-mint-700';
  } else if (color === 'red') {
    baseColors = 'bg-red-600 text-white';
    onHover = 'hover:bg-red-500';
    onActive = 'active:bg-red-400';
  } else if (color === 'white') {
    baseColors = 'bg-white text-black';
    onHover = 'hover:bg-blue-100';
    onActive = 'active:bg-blue-200';
  } else if (color === 'gray') {
    baseColors = 'bg-gray-100 text-blue-500';
    onHover = 'hover:bg-gray-200';
    onActive = 'active:bg-gray-300';
  } else if (color === 'sky') {
    baseColors = 'sky-btn text-black';
    onHover = 'hover:sky-btn-hover';
    onActive = 'active:sky-btn-active';
  }
  const onDisabled = 'disabled:bg-gray-300 disabled:text-gray-500';
  const weight = bold ? 'font-semibold' : '';
  const allClasses = `${base} ${baseColors} ${onHover} ${onDisabled} ${onActive} ${weight} ${classes}`;

  return (
    <button
      onClick={onClick}
      type={type ?? 'button'}
      disabled={disabled ?? false}
      title={title}
      className={allClasses}
      {...passThruProps}
    >
      {icon ? (
        <div className="flex items-center justify-center space-x-1">
          {props.icon}
          {props.children}
        </div>
      ) : (
        <>{props.children}</>
      )}
    </button>
  );
}
