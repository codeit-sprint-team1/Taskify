import Image from 'next/image';

export interface ProfileImageProps {
  name: string;
  src: string | null;
}

export default function ProfileImage({ name, src }: ProfileImageProps) {
  return (
    <div className="rounded-full flex-center w-38pxr h-38pxr bg-green relative overflow-hidden">
      {src ? (
        <Image src={src} alt="프로필 이미지" fill />
      ) : (
        <p className="text-white">{name[0]}</p>
      )}
    </div>
  );
}
