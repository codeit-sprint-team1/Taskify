import React, {
  ChangeEvent,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useRef,
  useState,
} from 'react';
import dropdownImage from '@/public/icons/dropdown-icon.svg';
import Image from 'next/image';
import { Label, ProfileImage } from '..';
import ColumnState from '../common/ColumnState';

interface DropdownManagerProps {
  initialState: ReactNode;
  titles: string[];
}

export default function DropdownState({
  initialState,
  titles,
}: DropdownManagerProps) {
  const [value, setValue] = useState<ReactNode>(initialState);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState('');

  const handleMemberClick = (title: string) => {
    setValue(title);
    setSelectedMember(title);
    setIsOpen(false);
  };
  return (
    <div className="w-217pxr h-79pxr">
      <Label htmlFor="members" text="상태" />
      <div className="relative flex items-center ">
        <button
          type="submit"
          onClick={() => setIsOpen(!isOpen)}
          className={`block w-full rounded-md border border-solid border-gray30
           pr-16pxr ${
             selectedMember && value ? 'pl-40pxr' : 'pl-11pxr'
           }  tablet:text-16pxr mobile:text-14pxr text-gray70 placeholder:text-gray40 outline-0 h-50pxr `}
        />
        {selectedMember && value && (
          <div className="absolute pl-10pxr" onClick={() => setIsOpen(!isOpen)}>
            <ColumnState title={selectedMember} />
          </div>
        )}

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
      {isOpen &&
        titles?.map((title) => (
          <button
            className="block w-full hover:border hover:border-gray40 hover:rounded-md tablet:text-16pxr mobile:text-14pxr text-gray70 placeholder:text-gray40  "
            onClick={() => handleMemberClick(title)}
            key={title}
            tabIndex={0}
          >
            <div className="flex items-center gap-6pxr pl-10pxr p-5pxr ">
              <ColumnState title={title} />
            </div>
          </button>
        ))}
    </div>
  );
}
