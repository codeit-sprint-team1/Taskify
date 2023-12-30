import AddImage from '@/public/icons/add-icon.svg';
import Image from 'next/legacy/image';
import { ChangeEvent, MouseEvent, useRef, useState } from 'react';
import { CardLabelProps } from '../common/Textarea';
import { Label } from '..';

export default function ImagePick({ label, required }: CardLabelProps) {
  const [selectImage, setSelectImage] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleButtonClick = (e: MouseEvent) => {
    fileInput.current?.click();
  };

  const handleProfileChange = (e: ChangeEvent) => {
    if (fileInput.current?.files && fileInput.current.files[0]) {
      const imageFile = fileInput.current.files[0];
      const imageURL = URL.createObjectURL(imageFile);
      if (selectImage) {
        URL.revokeObjectURL(selectImage);
      }
      setSelectImage(imageURL);
    }
  };

  return (
    <div>
      <Label text={label} required={required} />
      <button
        type="button"
        className="border border-solid rounded-md bg-gray10 w-76pxr h-76pxr relative overflow-hidden mobile:w-58pxr mobile:h-58pxr"
        onClick={handleButtonClick}
      >
        <div className="w-full h-full">
          <input
            type="file"
            className="hidden"
            ref={fileInput}
            onChange={handleProfileChange}
            accept="image/*"
          />
          {selectImage ? (
            <div className="w-full h-full rounded-md overflow-hidden relative">
              <Image
                src={selectImage}
                alt="프로필 이미지"
                layout="fill"
                objectFit="cover"
              />
            </div>
          ) : (
            <div className="p-24pxr mobile:p-18pxr">
              <Image
                src={AddImage}
                alt="더하기 이미지"
                width={28}
                height={28}
              />
            </div>
          )}
        </div>
      </button>
    </div>
  );
}
