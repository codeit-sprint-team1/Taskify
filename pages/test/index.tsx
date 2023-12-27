import { Input, ProfileImage, TextArea } from '@/components';
import DropdownManager from '@/components/modal/DropdownManager';
import ImagePick from '@/components/modal/ImagePick';
import SelectDate from '@/components/modal/SelectDate';

export default function testPage() {
  return (
    <div>
      <TextArea label="설명" required={true} />
      <SelectDate label="마감일" />
      <ImagePick label="이미지" />
      <DropdownManager ProfileSrc="" />
      {/* <ProfileImage name="이승연" src={null} /> */}
    </div>
  );
}
