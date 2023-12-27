import Image from 'next/image';
import addBoxIcon from '@/public/icons/add_box-icon.svg';
import { CreateDashboardModal } from '@/components';
import useToggle from '@/hooks/useToggle';

export default function CreateDashboardButton() {
  const { isOn, toggle } = useToggle(false);
  return (
    <>
      <button onClick={toggle}>
        <Image src={addBoxIcon} alt="대시보드를 추가할 수 있는 플러스 아이콘" />
      </button>
      <CreateDashboardModal isOpen={isOn} onCancel={toggle} />
    </>
  );
}
