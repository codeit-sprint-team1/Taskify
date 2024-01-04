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
  colorName: string;
  checked: boolean;
}

function EditColorChips({ onSelect }: ColorChipsProps) {
  const [isSelect, setIsSelect] = useState([
    { key: '5', value: '#7ac555', colorName: 'bg-green', checked: false },
    { key: '6', value: '#5534da', colorName: 'bg-violet', checked: false },
    { key: '7', value: '#ffa500', colorName: 'bg-orange', checked: false },
    { key: '8', value: '#76a5ea', colorName: 'bg-blue', checked: false },
    { key: '9', value: '#e876ea', colorName: 'bg-pink', checked: false },
  ]);

  const onChangeCheck =
    (element: PaletteType) => (event: ChangeEvent<HTMLInputElement>) => {
      const selectedInput = isSelect.map((element, index) => {
        return {
          ...element,
          checked: Number(element.key) === Number(event?.target.id),
        };
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
            id={String(index + 5)}
            onChange={onChangeCheck(element)}
            checked={Boolean(element.checked)}
            className="hidden"
          />
          <motion.div
            className={`w-30pxr h-30pxr rounded-full cursor-pointer flex-center ${element.colorName}`}
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

export default EditColorChips;
