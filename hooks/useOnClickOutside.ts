import { useRef, useEffect } from 'react';
import useToggle from './useToggle';

const useOnClickOutside = () => {
  const { isOn, toggle } = useToggle(false);
  const ref = useRef<HTMLDivElement & HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (ref.current !== null && !ref.current.contains(e.target as Node)) {
        toggle();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }),
    [ref];

  return { isOn, ref, toggle };
};

export default useOnClickOutside;
