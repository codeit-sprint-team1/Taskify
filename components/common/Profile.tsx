import ProfileImage, { ProfileImageProps } from './ProfileImage';

export default function Profile({ src, name, userId }: ProfileImageProps) {
  return (
    <div className="flex items-center gap-12pxr">
      <ProfileImage src={src} name={name} userId={userId} />
      <p className="text-black whitespace-nowrap">{name}</p>
    </div>
  );
}
