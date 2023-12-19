import React, { ChangeEvent, useState } from 'react';
import { motion } from 'framer-motion';
import checkIcon from '@/public/icons/checkIcon.svg';
import Image from 'next/image';

interface ColorChipsProps {
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

interface PaletteType {
  key: string;
  value: string;
  checked: boolean;
}

function ColorChips({ setColor }: ColorChipsProps) {
  const [isSelect, setIsSelect] = useState([
    { key: '0', value: '#7AC555', checked: false },
    { key: '1', value: '#760DDE', checked: false },
    { key: '2', value: '#FFA500', checked: false },
    { key: '3', value: '#76A5EA', checked: false },
    { key: '4', value: '#E876EA', checked: false },
  ]);

  const onChangeCheck =
    (element: PaletteType) => (event: ChangeEvent<HTMLInputElement>) => {
      const selectedInput = isSelect.map((element, index) => {
        return { ...element, checked: index === Number(event?.target.id) };
      });
      setIsSelect(selectedInput);
      setColor(element.value);
    };
  return (
    <div className="flex space-x-2.5">
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
            className="w-7 h-7 rounded-full cursor-pointer flex-center"
            style={{ backgroundColor: element.value }}
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
