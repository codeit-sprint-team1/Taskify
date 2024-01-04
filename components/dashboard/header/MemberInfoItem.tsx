import { ProfileImage } from '@/components';

interface MemberInfoItemProps {
  showImage?: boolean;
  imageUrl?: string;
  nickname: string;
  email: string;
}

export default function MemberInfoItem({
  showImage,
  imageUrl,
  nickname,
  email,
}: MemberInfoItemProps) {
  return (
    <div className="flex">
      <div className="shrink">
        {showImage && (
          <ProfileImage name={nickname} src={imageUrl ?? ''} userId={0} />
        )}
      </div>
      <div className="w-full text-11pxr p-3pxr rounded-sm">
        <p>{nickname}</p>
        <p>{email}</p>
      </div>
    </div>
  );
}
