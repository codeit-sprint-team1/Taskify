import Image from 'next/image';
import { MouseEvent, ReactNode } from 'react';
import cancelIcon from '@/public/icons/cancel-icon.svg';

interface TagProps {
  tag: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  isEdit?: boolean;
}

export default function Tag({ tag, onClick, isEdit = false }: TagProps) {
  return (
    <div className="inline-flex whitespace-nowrap items-center h-22pxr gap-5pxr pl-8pxr pr-3pxr border rounded-md bg-gray10">
      <span className="text-12pxr text-green ">{tag}</span>
      {isEdit && (
        <button onClick={onClick}>
          <Image src={cancelIcon} alt="태그 삭제 아이콘" />
        </button>
      )}
    </div>
  );
}
