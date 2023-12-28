import Image from 'next/image';

export interface ProfileImageProps {
  name: string;
  src: string | null;
  size?: string;
}

export default function ProfileImage({ name, src, size }: ProfileImageProps) {
  const divSize = size === 'sm' ? 'w-26pxr h-26pxr' : 'w-38pxr h-38pxr';
  const ImageSize = size === 'sm' ? 26 : 38;
  return (
    <div
      className={`rounded-full flex-center bg-green relative overflow-hidden ${divSize}`}
    >
      {src ? (
        <Image
          src={src}
          alt="프로필 이미지"
          width={ImageSize}
          height={ImageSize}
        />
      ) : (
        <p className="text-white">{name[0]}</p>
      )}
    </div>
  );
}
