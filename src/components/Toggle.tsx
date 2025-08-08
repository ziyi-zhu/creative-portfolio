interface ToggleProps {
  isOn: boolean;
  onToggle: () => void;
  leftLabel: string;
  rightLabel: string;
}

export default function Toggle({
  isOn,
  onToggle,
  leftLabel,
  rightLabel,
}: ToggleProps) {
  return (
    <button onClick={onToggle} className='flex items-center space-x-4 text-xl'>
      <span className={!isOn ? '' : 'opacity-50'}>{leftLabel}</span>
      <div
        className='relative inline-flex h-6 w-11 items-center rounded-full transition-colors'
        style={{
          backgroundColor: isOn
            ? 'var(--color-primary)'
            : 'var(--color-toggle-inactive)',
        }}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
            isOn ? 'translate-x-6' : 'translate-x-1'
          }`}
          style={{ backgroundColor: 'var(--color-white)' }}
        />
      </div>
      <span className={isOn ? '' : 'opacity-50'}>{rightLabel}</span>
    </button>
  );
}
