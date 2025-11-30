import React from 'react';

type IconName =
  | 'calendar'
  | 'car'
  | 'fuel-pump'
  | 'gear'
  | 'check-circle'
  | 'Location'
  | 'arr-down'
  | 'arr-up'
  | 'filled-heart'
  | 'heart';

interface IconProps {
  name: IconName;
  className?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({
  name,
  className = '',
  width = 20,
  height = 20,
  onClick,
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      onClick={onClick}
      style={onClick ? { cursor: 'pointer' } : {}}
    >
      <use xlinkHref={`/sprite.svg#icon-${name}`} />
    </svg>
  );
};

export default Icon;
