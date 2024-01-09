import { ChangeEvent, forwardRef } from 'react';
import { Label } from '..';

export interface CardLabelProps {
  label?: string;
  required?: boolean;
}

interface TextareaProps extends CardLabelProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, required, value, onChange }, ref) => {
    return (
      <div>
        <Label text={label} required={required} />
        <div className="mt-2.5">
          <textarea
            ref={ref}
            className="selection:block w-full rounded-md border border-solid px-16pxr py-15pxr tablet:text-16pxr mobile:text-14pxr text-gray70 placeholder:text-gray40 focus:border-violet outline-0 mobile:w-287pxr"
            maxLength={200}
            placeholder="200자 이내로 작성해주세요."
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    );
  }
);

export default Textarea;
