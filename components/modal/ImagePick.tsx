import React, {
  forwardRef,
  useState,
  useRef,
  useImperativeHandle,
  ChangeEvent,
  MouseEvent,
} from 'react';
import AddImage from '@/public/icons/add-icon.svg';
import Image from 'next/legacy/image';
import { CardLabelProps } from '../common/Textarea';
import { Label } from '..';

interface ImagePickProps extends CardLabelProps {
  onSelectImage: (file: File) => void;
}

const ImagePick = forwardRef((props: ImagePickProps, ref) => {
  const [selectImageURL, setSelectImageURL] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      fileInput.current?.click();
    },
  }));

  const handleButtonClick = (e: MouseEvent) => {
    fileInput.current?.click();
  };

  const handleProfileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (fileInput.current?.files && fileInput.current.files[0]) {
      const imageFile = fileInput.current.files[0];
      const imageURL = URL.createObjectURL(imageFile);
      if (selectImageURL) {
        URL.revokeObjectURL(selectImageURL);
      }
      setSelectImageURL(imageURL);
      props.onSelectImage(imageFile);
    }
  };

  return (
    <div>
      <Label text={props.label} required={props.required} />
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
          {selectImageURL ? (
            <div className="w-full h-full rounded-md overflow-hidden relative">
              <Image
                src={selectImageURL}
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
});

export default ImagePick;
