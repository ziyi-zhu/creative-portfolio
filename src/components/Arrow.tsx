interface ArrowProps {
  direction: 'left' | 'right' | 'up' | 'down';
  size?: number;
  className?: string;
  onClick?: () => void;
}

export default function Arrow({
  direction,
  size = 48,
  className = '',
  onClick,
}: ArrowProps) {
  const getRotation = () => {
    switch (direction) {
      case 'left':
        return 'rotate(180deg)';
      case 'right':
        return 'rotate(0deg)';
      case 'up':
        return 'rotate(-90deg)';
      case 'down':
        return 'rotate(90deg)';
      default:
        return 'rotate(0deg)';
    }
  };

  const getViewBox = () => {
    return '0 0 48 48';
  };

  const getPath = () => {
    return 'M44 24L24 4M44 24L24 44M44 24H0';
  };

  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      className={`flex items-center justify-center transition-opacity hover:opacity-70 ${className}`}
      style={{
        color: className.includes('text-current')
          ? 'currentColor'
          : 'var(--color-primary)',
        width: size,
        height: size,
      }}
      onClick={onClick}
    >
      <svg
        width={size}
        height={size}
        viewBox={getViewBox()}
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        style={{
          transform: getRotation(),
        }}
      >
        <path
          d={getPath()}
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          fill='none'
        />
      </svg>
    </Component>
  );
}
