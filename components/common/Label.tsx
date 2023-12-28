export interface LabelProps {
  text?: string;
  required?: boolean;
  htmlFor?: string;
}

export default function Label({ text, required, htmlFor }: LabelProps) {
  return (
    <div className="font-medium mb-10pxr text-18pxr text-gray70 mobile:text-16pxr ">
      <label htmlFor={htmlFor}>{text}</label>
      {required && <span className="text-violet">*</span>}
    </div>
  );
}
