// import { useRef, useState } from 'react';
// import { Input, Label } from '..';

// const members = ['진수', '승연', '서영', '진우'];

// export default function DropdownManager() {
//   const [value, setValue] = useState<string>('');
//   return (
//     <div>
//       <Label htmlFor="members" text="담당자" />
//       <input
//         type="text"
//         list="members"
//         placeholder="이름을 입력해주세요"
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         className="border border-solid border-gray-70"
//       />
//       <datalist id="members">
//         {members?.map((member) => (
//           <div>
//             <option value={member}></option>
//           </div>
//         ))}
//       </datalist>
//     </div>
//   );
// }

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
  const ref = useRef<HTMLInputElement>(null);
  const [selectedMember, setSelectedMember] = useState('');
  const filteredMembers = members.filter((member) => member.includes(value));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e?.target?.value);
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (!ref?.current?.contains(document.activeElement)) {
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
          ref={ref}
          onBlur={handleBlur}
          onFocus={() => setIsOpen(true)}
          className={`block w-full rounded-md border border-solid border-gray30
           pr-16pxr pl-35pxr ${
             selectedMember && value ? 'pl-35pxr' : 'pl-11pxr'
           }  py-11pxr tablet:text-16pxr mobile:text-14pxr text-gray70 placeholder:text-gray40 focus:border-violet outline-0 h-50pxr `}
        />
        {selectedMember && value && (
          <div className="absolute pl-5pxr">
            <ProfileImage
              src={ProfileSrc}
              name={selectedMember}
              width={26}
              height={26}
            />
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
      {isOpen &&
        filteredMembers?.map((member) => (
          <button
            className="block w-full hover:border hover:border-gray40 hover:rounded-md tablet:text-16pxr mobile:text-14pxr text-gray70 placeholder:text-gray40  "
            onClick={() => handleMemberClick(member)}
            key={member}
            tabIndex={0}
          >
            <div className="flex items-center gap-6pxr pl-10pxr p-5pxr ">
              <ProfileImage
                src={ProfileSrc}
                name={member}
                width={26}
                height={26}
              />
              {member}
            </div>
          </button>
        ))}
    </div>
  );
}
