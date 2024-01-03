import { useRef, useEffect, useState } from 'react';

const useOnClickOutside = () => {
  const [isOn, setIsOn] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement & HTMLUListElement>(null);

  const toggle = () => {
    setIsOn(!isOn);
  };

  const close = () => {
    setIsOn(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (
        isOn &&
        ref.current !== null &&
        !ref.current.contains(e.target as Node)
      ) {
        setIsOn(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref]);

  return { isOn, ref, toggle, close };
};

export default useOnClickOutside;
