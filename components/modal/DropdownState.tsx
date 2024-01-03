import { MouseEvent, useEffect, useRef, useState } from 'react';
import dropdownImage from '@/public/icons/dropdown-icon.svg';
import Image from 'next/image';
import { Label } from '..';
import ColumnState from '../common/ColumnState';

interface DropdownManagerProps {
  initialState: string;
  states: string[];
}

export default function DropdownState({
  initialState,
  states,
}: DropdownManagerProps) {
  const [value, setValue] = useState(initialState);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const dropdownRef = useRef<HTMLUListElement>(null);
  const InputRef = useRef<HTMLInputElement>(null);

  const handleStateClick = (state: string) => {
    setValue(state);
    setSelectedState(state);
    setIsOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (InputRef.current && InputRef.current.contains(event.target as Node))
        return;

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div>
      <Label htmlFor="members" text="상태" />
      <div className="relative flex items-center ">
        <input
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          ref={InputRef}
          className={`block w-full rounded-md border border-solid border-gray30
           pr-16pxr ${
             selectedState && value ? 'pl-40pxr' : 'pl-11pxr'
           }  tablet:text-16pxr mobile:text-14pxr text-gray70 placeholder:text-gray40 outline-0 h-50pxr cursor-pointer mobile:text-14pxr`}
        />
        <div
          className="absolute pl-10pxr cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedState && value ? (
            <ColumnState state={selectedState} />
          ) : (
            <ColumnState state={value} />
          )}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} tabIndex={-1}>
          <Image
            src={dropdownImage}
            alt="목록보기 화살표 이미지"
            className="absolute right-10pxr top-10pxr"
            width={26}
            height={26}
          />
        </button>
      </div>
      <ul ref={dropdownRef} className="max-h-160pxr overflow-y-auto">
        {isOpen &&
          states?.map((state) => (
            <li key={state}>
              <button
                className="block w-full hover:border hover:border-gray40 hover:rounded-md tablet:text-16pxr mobile:text-14pxr text-gray70 placeholder:text-gray40  "
                onClick={() => handleStateClick(state)}
              >
                <div className="flex items-center gap-6pxr pl-10pxr p-5pxr ">
                  <ColumnState state={state} />
                </div>
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
