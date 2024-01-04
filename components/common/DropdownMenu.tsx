import { ReactNode } from 'react';

interface DropdownItem {
  key?: number | string;
  title: string;
  handler: () => void;
}

function DropdownItem({ title, handler }: DropdownItem) {
  return (
    <button
      type="button"
      onClick={handler}
      className="w-full text-left px-10pxr py-5pxr rounded-md hover:bg-violet8"
    >
      {title}
    </button>
  );
}

interface DropdownMenu {
  options: DropdownItem[];
}

export default function DropdownMenu({ options }: DropdownMenu) {
  return (
    <ul className="absolute top-28pxr right-0pxr mt-10pxr w-115pxr border border-2pxr border-gray30 rounded-lg p-8pxr bg-white z-10">
      {options.map((option) => {
        return (
          <li key={option.key}>
            <DropdownItem
              title={option.title}
              handler={option.handler}
            ></DropdownItem>
          </li>
        );
      })}
    </ul>
  );
}
