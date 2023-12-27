import Image from 'next/image';

export interface ProfileImageProps {
  name: string;
  src: string | null;
  width?: number;
  height?: number;
}

export default function ProfileImage({
  name,
  src,
  width = 38,
  height = 38,
}: ProfileImageProps) {
  return (
    <div
      className={`rounded-full flex-center bg-green`}
      style={{ width: width, height: height }}
    >
      {src ? (
        <Image src={src} alt="프로필 이미지" width={width} height={height} />
      ) : (
        <p className="text-white">{name[0]}</p>
      )}
    </div>
  );
}
