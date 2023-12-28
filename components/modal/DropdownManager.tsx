import React, { ChangeEvent, useRef, useState } from 'react';
import dropdownImage from '@/public/icons/dropdown-icon.svg';
import Image from 'next/image';
import { Label, ProfileImage } from '..';

interface DropdownManagerProps {
  ProfileSrc: string;
}

export default function DropdownManager({ ProfileSrc }: DropdownManagerProps) {
  const members = ['진수', '승연', '서영', '진우', '일이삼사오육칠팔구십'];
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedMember, setSelectedMember] = useState('');
  const filteredMembers = members.filter((member) => member.includes(value));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e?.target?.value);
  };

  const handleBlur = () => {
    if (!isOpen && !value) setIsOpen(false);

    setTimeout(() => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(document.activeElement)
      ) {
        setIsOpen(false);
      }
    }, 100);
  };

  const handleOpenClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMemberClick = (member: string) => {
    setValue(member);
    setSelectedMember(member);
    setIsOpen(false);
  };
  return (
    <div className="w-217pxr h-79pxr">
      <Label htmlFor="members" text="담당자" />
      <div className="relative flex items-center ">
        <input
          type="text"
          list="members"
          placeholder="이름을 입력해주세요"
          value={value}
          onChange={handleChange}
          ref={inputRef}
          onBlur={handleBlur}
          onFocus={() => setIsOpen(true)}
          className={`block w-full rounded-md border border-solid border-gray30
           pr-16pxr ${
             selectedMember && value ? 'pl-40pxr' : 'pl-11pxr'
           }  tablet:text-16pxr mobile:text-14pxr text-gray70 placeholder:text-gray40 focus:border-violet outline-0 h-50pxr `}
        />
        {selectedMember && value && (
          <div className="absolute pl-10pxr">
            <ProfileImage src={ProfileSrc} name={selectedMember} size="sm" />
          </div>
        )}

        <button onClick={handleOpenClick} tabIndex={-1}>
          <Image
            src={dropdownImage}
            alt="목록보기 화살표 이미지"
            className="absolute right-10pxr top-10pxr"
            width={26}
            height={26}
          />
        </button>
      </div>
      <div ref={dropdownRef}>
        {isOpen &&
          filteredMembers?.map((member) => (
            <button
              className="block w-full hover:border hover:border-gray40 hover:rounded-md tablet:text-16pxr mobile:text-14pxr text-gray70 placeholder:text-gray40  "
              onClick={() => handleMemberClick(member)}
              key={member}
              tabIndex={0}
            >
              <div className="flex items-center gap-6pxr pl-10pxr p-5pxr ">
                <ProfileImage src={ProfileSrc} name={member} size="sm" />
                {member}
              </div>
            </button>
          ))}
      </div>
    </div>
  );
}
