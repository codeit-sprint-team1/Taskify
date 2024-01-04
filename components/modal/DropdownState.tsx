import { forwardRef, useState } from 'react';
import dropdownImage from '@/public/icons/dropdown-icon.svg';
import Image from 'next/image';
import { Label } from '..';
import ColumnState from '../common/ColumnState';
import { Columns } from '@/types/columns';
import useOnClickOutside from '@/hooks/useOnClickOutside';

interface DropdownStateProps {
  initialState: string;
  onChange: (value: number) => void;
  states: Columns[];
}

const DropdownState = forwardRef<HTMLInputElement, DropdownStateProps>(
  ({ initialState, onChange, states }: DropdownStateProps, ref) => {
    const [title, setTitle] = useState(initialState); //input에 보이는 값
    const {
      isOn: isOpen,
      close,
      ref: dropdownRef,
      toggle,
    } = useOnClickOutside();

    const handleStateClick = (state: Columns) => {
      setTitle(state.title);
      onChange(state.id);
      close();
    };

    return (
      <>
        <Label htmlFor="members" text="상태" />
        <div ref={dropdownRef}>
          <div onClick={toggle} className="relative flex items-center ">
            <input
              ref={ref}
              type="button"
              className={`block w-full rounded-md border border-solid border-gray30
           pr-16pxr ${
             title ? 'pl-40pxr' : 'pl-11pxr'
           }  tablet:text-16pxr mobile:text-14pxr text-gray70 placeholder:text-gray40 outline-0 h-50pxr cursor-pointer`}
            />
            <div className="absolute cursor-pointer pl-10pxr">
              {title && <ColumnState state={title} />}
            </div>

            <button tabIndex={-1}>
              <Image
                src={dropdownImage}
                alt="목록보기 화살표 이미지"
                className="absolute right-10pxr top-10pxr"
                width={26}
                height={26}
              />
            </button>
          </div>
          <div className="relative">
            {isOpen && (
              <ul className="absolute right-0pxr mt-10pxr w-217pxr border border-2pxr border-gray30 rounded-lg p-8pxr bg-white tablet:text-16pxr mobile:text-14pxr z-10">
                {states?.map((state) => (
                  <li key={state.id}>
                    <button
                      className="w-full text-left px-10pxr py-5pxr rounded-md hover:bg-violet8 tablet:text-16pxr mobile:text-14pxr"
                      onClick={() => handleStateClick(state)}
                    >
                      <div className="flex items-center gap-6pxr pl-10pxr p-5pxr ">
                        <ColumnState state={state.title} />
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </>
    );
  }
);

export default DropdownState;
