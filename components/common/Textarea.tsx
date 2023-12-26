import { Label } from '..';

export interface CardLabelProps {
  label?: string;
  required?: boolean;
}

export default function Textarea({ label, required }: CardLabelProps) {
  return (
    <div>
      <Label text={label} required={required} />
      <div className="mt-2.5">
        <textarea
          className="selection:block w-full rounded-md border border-solid px-16pxr py-15pxr tablet:text-16pxr mobile:text-14pxr text-gray70 placeholder:text-gray40 focus:border-violet outline-0"
          maxLength={200}
          placeholder="200자 이내로 작성해주세요."
        />
      </div>
    </div>
  );
}
