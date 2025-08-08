interface CrossProps {
  size?: number;
  className?: string;
  onClick?: () => void;
}

export default function Cross({
  size = 48,
  className = '',
  onClick,
}: CrossProps) {
  const getViewBox = () => {
    return '0 0 48 48';
  };

  const getPath = () => {
    return 'M12 12L36 36M36 12L12 36';
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
