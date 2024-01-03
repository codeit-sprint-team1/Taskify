import React, {
  ChangeEvent,
  KeyboardEvent,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import dropdownImage from '@/public/icons/dropdown-icon.svg';
import Image from 'next/image';
import { Label, ProfileImage } from '..';
import useGetMembers from '../boardEdit/data/useGetMembers';
import { Members } from '@/types/members';

interface DropdownManagerProps {
  value?: string;
  onChange?: (value: number) => void;
  dashboardId: number;
}

const DropdownManager = forwardRef<HTMLInputElement, DropdownManagerProps>(
  ({ value: externalValue, onChange: externalOnChange, dashboardId }, ref) => {
    const { execute: getMembers, data: members } = useGetMembers({
      boardid: dashboardId,
      page: 1,
      size: 20,
    });

    useEffect(() => {
      getMembers();
    }, [dashboardId]);

    const [internalValue, setInternalValue] = useState(externalValue || '');
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLUListElement>(null);
    const [selectedMember, setSelectedMember] = useState('');
    const [selectedMemberProfile, setSelectedMemberProfile] = useState('');
    const [isMemberNotFound, setIsMemberNotFound] = useState(false);
    const filteredMembers = members.filter((member) =>
      member.nickname.includes(internalValue)
    );
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      if (selectedMember || e.target.value) setIsMemberNotFound(false);
    };

    const handleBlur = () => {
      if (!isOpen && !internalValue) setIsOpen(false);

      setTimeout(() => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(document.activeElement)
        ) {
          setIsOpen(false);
        }
      }, 100);

      const memberExists = members.some(
        (member) => member.nickname === internalValue
      );
      setIsMemberNotFound(!memberExists && internalValue !== '');
    };

    const handleOpenClick = () => {
      setIsOpen(!isOpen);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setTimeout(() => {
          if (
            dropdownRef.current &&
            dropdownRef.current.contains(document.activeElement)
          ) {
            setIsMemberNotFound(false);
          }
        }, 0);
      }
    };

    const handleFocus = () => {
      setIsOpen(true);
      setIsMemberNotFound(false);
    };

    const handleMemberClick = (member: Members) => {
      setInternalValue(member.nickname);
      setSelectedMember(member.nickname);
      setSelectedMemberProfile(member.profileImageUrl);
      setIsMemberNotFound(false);
      setIsOpen(false);
      if (externalOnChange) {
        externalOnChange(member.userId);
      }
    };

    return (
      <div>
        <Label htmlFor="members" text="담당자" />
        <div className="relative flex items-center ">
          <input
            ref={ref}
            type="text"
            list="members"
            placeholder="이름을 입력해주세요"
            value={internalValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            className={`block w-full rounded-md border border-solid border-gray30
              pr-16pxr ${
                selectedMember === internalValue && internalValue
                  ? 'pl-40pxr'
                  : 'pl-11pxr'
              }  tablet:text-16pxr mobile:text-14pxr text-gray70 placeholder:text-gray40 focus:border-violet outline-0 h-50pxr`}
          />
          {selectedMember === internalValue && internalValue && (
            <div className="absolute pl-10pxr">
              <ProfileImage
                src={selectedMemberProfile}
                name={selectedMember}
                size="sm"
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
        {isMemberNotFound && (
          <p className="text-red text-14pxr mt-8pxr">
            존재하지 않는 멤버입니다
          </p>
        )}
        <ul ref={dropdownRef} className="max-h-180pxr overflow-y-auto">
          {isOpen &&
            filteredMembers.map((member) => (
              <li key={member.id}>
                <button
                  className="block w-full hover:border hover:border-gray40 hover:rounded-md tablet:text-16pxr mobile:text-14pxr text-gray70 placeholder:text-gray40  "
                  onClick={() => handleMemberClick(member)}
                  tabIndex={0}
                >
                  <div className="flex items-center gap-6pxr pl-10pxr p-5pxr ">
                    <ProfileImage
                      src={member.profileImageUrl}
                      name={member.nickname}
                      size="sm"
                    />
                    {member.nickname}
                  </div>
                </button>
              </li>
            ))}
        </ul>
      </div>
    );
  }
);

export default DropdownManager;
