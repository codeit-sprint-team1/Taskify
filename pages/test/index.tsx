import { Input, ProfileImage, TextArea } from '@/components';
import ColumnState from '@/components/common/ColumnState';
import DropdownManager from '@/components/modal/DropdownManager';
import DropdownState from '@/components/modal/DropdownState';
import ImagePick from '@/components/modal/ImagePick';
import SelectDate from '@/components/modal/SelectDate';

export default function testPage() {
  const titles = ['To Do', 'On Progress', 'Done'];
  return (
    <div>
      <TextArea label="설명" required={true} />
      <SelectDate label="마감일" />
      <ImagePick label="이미지" />
      <DropdownManager ProfileSrc="" />
      <DropdownState
        titles={titles}
        initialState={<ColumnState title="To do" />}
      />
      <div className="mb-30pxr"></div>
      {/* <ColumnState title="To Do" /> */}
    </div>
  );
}
