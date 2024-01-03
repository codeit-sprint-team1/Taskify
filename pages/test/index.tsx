import useToggle from '@/hooks/useToggle';
import CreateCardModal from '@/components/modal/create-card/CreateCardModal';
import AddTag from '@/components/modal/edit-card/AddTag';
import DropdownManager from '@/components/modal/DropdownManager';

export default function testPage() {
  const { isOn, toggle } = useToggle(true);
  return (
    <div>
      <DropdownManager ProfileSrc={null} />
      <CreateCardModal isOpen={isOn} onCancel={toggle} />
    </div>
  );
}
