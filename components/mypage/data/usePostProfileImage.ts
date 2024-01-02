import { useAsync } from '@/hooks/useAsync';
import { axiosAuthInstance } from '@/utils';

interface usePostProfileImageProps {
  imgFile: File | undefined;
}

function usePostProfileImage({ imgFile }: usePostProfileImageProps) {
  const postProfileImage = () => {
    const formData = new FormData();
    if (imgFile) {
      formData.append('image', imgFile);
    }
    axiosAuthInstance.post(
      `users/me/image`,
      {
        formData,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  };
  const { execute, data } = useAsync(postProfileImage, true);
  return {
    execute,
    data,
  };
}

export default usePostProfileImage;
