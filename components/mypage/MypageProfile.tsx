import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import addIcon from '@/public/icons/add-icon.svg';
import Image from 'next/image';
import { Button, Input } from '..';
import { axiosAuthInstance } from '@/utils';

function MypageProfile() {
  const imageUploaderRef = useRef<HTMLInputElement>(null);
  const [imgFile, setImgFile] = useState<File | null>();
  const [preview, setPreview] = useState<string | null>('');
  const formData = new FormData();
  const onClickInput = () => {
    if (imageUploaderRef.current) {
      imageUploaderRef.current.click();
    }
  };
  const onChangeImg = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const file = event.target.files[0];
      if (file && file.type.substring(0, 5) === 'image') {
        setImgFile(file);
      } else {
        setImgFile(null);
      }
    }
  };

  useEffect(() => {
    if (imgFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(imgFile);
    } else {
      setPreview(null);
    }
  }, [imgFile]);

  const modifyMydata = async () => {
    await axiosAuthInstance.put(`users/me`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };
  return (
    <div className="max-w-[620px] space-y-32pxr p-28pxr">
      <h1 className="text-24pxr font-bold mobile:text-20pxr">프로필</h1>
      <div className="flex flex-col gap-24pxr">
        <div className="flex gap-16pxr mobile:block mobile:space-y-24pxr">
          <div
            className="flex-center bg-gray10 w-190pxr h-190pxr border mobile:w-100pxr mobile:h-100pxr cursor-pointer"
            style={{
              backgroundImage: preview ? `url(${preview})` : 'none',
              backgroundRepeat: 'no-repeat',
              objectFit: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <input
              type="file"
              className="hidden"
              name="imageUploader"
              ref={imageUploaderRef}
              onChange={onChangeImg}
              accept="image/*"
            />
            <label htmlFor="imageUploader">
              <button onClick={onClickInput}>
                <Image
                  src={addIcon}
                  alt="추가하기 아이콘"
                  className="w-30pxr mobile:w-20pxr bg-white rounded-full"
                />
              </button>
            </label>
          </div>
          <div className="flex flex-col gap-16pxr grow">
            <Input label="이메일" value="이메일밸류" />
            <Input label="닉네임" value="닉네임밸류" />
          </div>
        </div>
        <Button
          variant="primary"
          size="desktop"
          className="self-end mobile:w-84pxr mobile:h-28pxr"
        >
          변경
        </Button>
      </div>
    </div>
  );
}

export default MypageProfile;
