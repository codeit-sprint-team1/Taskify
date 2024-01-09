import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface HeaderButtonProps {
  onClick: () => void;
  src: string;
  alt: string;
  children: ReactNode;
}
export default function HeaderButton({
  onClick,
  src,
  alt,
  children,
}: HeaderButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-center gap-8pxr py-8pxr px-16pxr mx-6pxr desktop:mx-8pxr mobile:mx-3pxr mobile:py-7pxr mobile:px-12pxr rounded-md border border-solid border-gray30 text-14pxr desktop:text-16pxr text-gray50  hover:bg-violet8 focus:bg-violet8 bg-white whitespace-nowrap`}
    >
      <Image
        src={src}
        alt={alt}
        width={20}
        height={20}
        className="mobile:hidden"
      />
      {children}
    </button>
  );
}
