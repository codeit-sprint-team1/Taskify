import logo from '@/public/icons/logo.svg';
import mainImage from '@/public/icons/mainIcon.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { WELLCOME_MESSAGE } from '../constants';
import Link from 'next/link';

export function SignHeader() {
  const router = useRouter();
  const isLoginPage = router.pathname === '/login';

  return (
    <div>
      <Link href="/">
        <Image src={mainImage} alt="메인 이미지" />
        <Image src={logo} alt="로고 이미지" />
      </Link>
      <div>
        <span>
          {isLoginPage ? WELLCOME_MESSAGE.login : WELLCOME_MESSAGE.signup}
        </span>
      </div>
    </div>
  );
}
