import { Input, TextArea } from '@/components';
import Textarea from '@/components/common/Textarea';
import SelectDate from '@/components/modal/SelectDate';

export default function testPage() {
  return (
    <div>
      <TextArea label="설명" required={true} />
      <SelectDate />
    </div>
  );
}
