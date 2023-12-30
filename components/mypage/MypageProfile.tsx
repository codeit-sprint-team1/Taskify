import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import addIcon from '@/public/icons/add-icon.svg';
import Image from 'next/image';
import { Button, Input } from '..';
import { axiosAuthInstance } from '@/utils';
import { useUserInfo } from '@/store/memos';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../common/Toast';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';

function MypageProfile() {
  const { userInfo, setUserInfo } = useUserInfo();
  const { email, profileImageUrl, nickname: userNickname } = userInfo;
  const imageUploaderRef = useRef<HTMLInputElement>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(profileImageUrl);

  const { control, watch, setError } = useForm({ mode: 'onBlur' });

  const onClickInput = () => {
    if (imageUploaderRef.current) {
      imageUploaderRef.current.click();
    }
  };

  const postProfileImage = async (imgFile: File | undefined) => {
    if (!imgFile) return;
    const res = await axiosAuthInstance.post(
      `users/me/image`,
      {
        image: imgFile,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    setImgUrl(res?.data.profileImageUrl);
  };

  const onChangeImg = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const file = event.target.files[0];
      if (file && file.type.substring(0, 5) === 'image') {
        postProfileImage(file);
        return;
      }
    }
  };

  const modifyMydata = async () => {
    try {
      const res = await axiosAuthInstance.put(`users/me`, {
        nickname: watch('nickname'),
        profileImageUrl: imgUrl,
      });
      if (res.status === 200) {
        notify({ type: 'success', text: '회원정보가 수정되었습니다 😊' });
        setUserInfo(res?.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError('nickname', { message: error.response?.data.message });
      }
    }
  };

  return (
    <div className="max-w-[620px] space-y-32pxr p-28pxr">
      <h1 className="text-24pxr font-bold mobile:text-20pxr">프로필</h1>
      <div className="flex flex-col gap-24pxr">
        <div className="flex gap-16pxr mobile:block mobile:space-y-24pxr">
          <div
            className="flex-center bg-gray10 w-190pxr h-190pxr border mobile:w-100pxr mobile:h-100pxr cursor-pointer"
            style={{
              backgroundImage: imgUrl ? `url(${imgUrl})` : 'none',
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
            <Input
              label="이메일"
              value={email}
              disabled
              classNames="text-gray30"
            />
            <Controller
              name="nickname"
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  label="닉네임"
                  hasError={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                />
              )}
            ></Controller>
          </div>
        </div>
        <Button
          variant="primary"
          size="desktop"
          className="self-end mobile:w-84pxr mobile:h-28pxr"
          onClick={modifyMydata}
        >
          변경
        </Button>
      </div>
    </div>
  );
}

export default MypageProfile;
