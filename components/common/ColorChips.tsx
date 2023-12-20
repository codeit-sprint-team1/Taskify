import React, { ChangeEvent, useState } from 'react';
import { motion } from 'framer-motion';
import checkIcon from '@/public/icons/checkIcon.svg';
import Image from 'next/image';

interface ColorChipsProps {
  onSelect: (color: string) => void;
}

interface PaletteType {
  key: string;
  value: string;
  checked: boolean;
}

function ColorChips({ onSelect }: ColorChipsProps) {
  const [isSelect, setIsSelect] = useState([
    { key: '0', value: 'bg-green', checked: false },
    { key: '1', value: 'bg-violet', checked: false },
    { key: '2', value: 'bg-orange', checked: false },
    { key: '3', value: 'bg-blue', checked: false },
    { key: '4', value: 'bg-pink', checked: false },
  ]);

  const onChangeCheck =
    (element: PaletteType) => (event: ChangeEvent<HTMLInputElement>) => {
      const selectedInput = isSelect.map((element, index) => {
        return { ...element, checked: index === Number(event?.target.id) };
      });
      setIsSelect(selectedInput);
      onSelect(element.value);
    };
  return (
    <div className="flex space-x-10pxr">
      {isSelect.map((element, index) => (
        <label htmlFor={element.key} key={element.key}>
          <input
            type="checkbox"
            name={element.key}
            key={element.key}
            id={String(index)}
            onChange={onChangeCheck(element)}
            checked={Boolean(element.checked)}
            className="hidden"
          />
          <motion.div
            className={`w-30pxr h-30pxr rounded-full cursor-pointer flex-center ${element.value}`}
            whileTap={{ scale: 0.7 }}
          >
            {element.checked && (
              <motion.div
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', bounce: 0.75 }}
              >
                <Image src={checkIcon} alt="체크 아이콘" />
              </motion.div>
            )}
          </motion.div>
        </label>
      ))}
    </div>
  );
}

export default ColorChips;
