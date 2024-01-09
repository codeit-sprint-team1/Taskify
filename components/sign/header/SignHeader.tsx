import logo from '@/public/icons/logo-icon.svg';
import mainImage from '@/public/icons/main-icon.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { WELLCOME_MESSAGE } from '../constants';
import Link from 'next/link';

export default function SignHeader() {
  const router = useRouter();
  const isLoginPage = router.pathname === '/login';

  return (
    <div className="flex flex-col items-center flex-initial gap-30pxr mb-38pxr">
      <Link href="/" className="self-end mobile:self-center">
        <Image
          src={mainImage}
          alt="메인 이미지"
          className="w-115px h-133pxr mobile:w-90pxr mobile:h-100pxr mobile:ml-15pxr"
        />
      </Link>
      <div className="flex flex-col flex-center">
        <Image
          src={logo}
          alt="로고 이미지"
          className="w-140pxr mobile:w-97pxr"
        />
        <span className="font-medium text-20pxr">
          {isLoginPage ? WELLCOME_MESSAGE.login : WELLCOME_MESSAGE.signup}
        </span>
      </div>
    </div>
  );
}
