import { ChangeEvent, useRef, useState } from 'react';
import classes from './Switch.module.css';

interface SwitchProps {
  label?: string;
  checked?: boolean;
  onChange?: (event: boolean) => void;
}

const Switch = (props: SwitchProps) => {
  const { label, checked, onChange } = props;
  const [isActive, setIsActive] = useState(checked ?? false);
  const switchContainerRef = useRef<HTMLDivElement>(null);
  const switchThumbRef = useRef<HTMLDivElement>(null);

  const toggleSwitch = (event: ChangeEvent<HTMLInputElement>) => {
    setIsActive(event.target.checked);
    if (onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <label
      style={{
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        gap: 4,
        maxWidth: 'fit-content',
        width: 'auto',
      }}
    >
      <input
        checked={isActive ?? false}
        style={{ display: 'none' }}
        type="checkbox"
        onChange={toggleSwitch}
      />
      <div
        className={isActive ? classes.activeThumbContainer : classes.offThumbContainer}
        ref={switchContainerRef}
        style={{
          alignItems: 'center',
          borderRadius: '9999px',
          display: 'flex',
          height: 18,
          position: 'relative',
          transition: 'all',
          transitionDuration: '150ms',
          width: 36,
        }}
      >
        <div
          ref={switchThumbRef}
          style={{
            background: 'black',
            border: '1px solid black',
            borderRadius: '9999px',
            height: 12,
            left: '1px',
            position: 'absolute',
            right: '1px',
            transform: isActive ? 'translateX(calc(100% + 8px))' : 'translateX(0)',
            transition: 'all',
            transitionDuration: '150ms',
            width: 12,
          }}
        ></div>
      </div>
      {label && <div>{label}</div>}
    </label>
  );
};

export default Switch;
