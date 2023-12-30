import {
  CreateDashboardModal,
  Input,
  ProfileImage,
  TextArea,
} from '@/components';
import ColumnState from '@/components/common/ColumnState';
import Tag from '@/components/common/Tag';
import AddTag from '@/components/modal/edit-card/AddTag';
import DropdownManager from '@/components/modal/DropdownManager';
import DropdownState from '@/components/modal/DropdownState';
import ImagePick from '@/components/modal/ImagePick';
import SelectDate from '@/components/modal/SelectDate';
import useToggle from '@/hooks/useToggle';
import CreateCardModal from '@/components/modal/create-card/CreateCardModal';

export default function testPage() {
  const states = ['To Do', 'On Progress', 'Done'];
  const { isOn, toggle } = useToggle(true);
  return (
    <div>
      <TextArea label="설명" required={true} />
      <SelectDate label="마감일" />
      <ImagePick label="이미지" />
      <DropdownManager ProfileSrc="" />
      <DropdownState states={states} initialState="To do" />
      <div className="mb-30pxr"></div>
      <AddTag />
      <CreateCardModal isOpen={isOn} onCancel={toggle} />
    </div>
  );
}
