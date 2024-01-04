export interface LabelProps {
  text?: string;
  required?: boolean;
  htmlFor?: string;
  size?: string;
}

export default function Label({ text, required, htmlFor, size }: LabelProps) {
  const textSize = size === 'sm' ? 'text-16pxr' : 'text-18pxr';

  return (
    <div
      className={`font-medium mb-10pxr ${textSize} text-gray70 mobile:text-16pxr `}
    >
      <label htmlFor={htmlFor}>{text}</label>
      {required && <span className="text-violet ml-5pxr">*</span>}
    </div>
  );
}
