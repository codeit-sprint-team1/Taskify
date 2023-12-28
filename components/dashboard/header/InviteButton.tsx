import InviteModal from '@/components/modal/InviteModal';
import useToggle from '@/hooks/useToggle';
import HeaderButton from './HeaderButton';
import addBoxIcon from '@/public/icons/add_box-icon.svg';

export default function InviteButton() {
  const { isOn, toggle } = useToggle(false);
  return (
    <>
      <HeaderButton
        onClick={toggle}
        src={addBoxIcon}
        alt="멤버를 초대할 수 있는 플러스 모양 아이콘"
      >
        초대하기
      </HeaderButton>
      <InviteModal isOpen={isOn} onCancel={toggle} />
    </>
  );
}
