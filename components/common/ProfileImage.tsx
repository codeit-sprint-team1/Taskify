import Image from 'next/image';

export interface ProfileImageProps {
  name: string;
  src: string | null;
  size?: string;
}

export default function ProfileImage({ name, src, size }: ProfileImageProps) {
  const divSize = size === 'sm' ? 'w-26pxr h-26pxr' : 'w-38pxr h-38pxr';
  return (
    <div
      className={`rounded-full flex-center bg-green border-2 border-white relative overflow-hidden ${divSize}`}
    >
      {src ? (
        <Image src={src} alt="프로필 이미지" fill />
      ) : (
        <p className="text-white">{name[0]}</p>
      )}
    </div>
  );
}
