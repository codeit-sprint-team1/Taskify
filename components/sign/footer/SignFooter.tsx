import Link from 'next/link';
import { BUTTON_TEXT, LINK_TEXT } from '../constants';
import { useRouter } from 'next/router';
import { ROUTE } from '@/constants/constants';

export default function SignFooter() {
  const router = useRouter();
  const isLoginPage = router.pathname === '/login';

  return (
    <div className="flex-center mt-20pxr gap-10pxr">
      <span>{isLoginPage ? LINK_TEXT.isNotMember : LINK_TEXT.isMember}</span>
      <div className="text-violet underline underline-offset-4 leading-30pxr">
        <Link href={isLoginPage ? ROUTE.signUp : ROUTE.login}>
          {isLoginPage ? BUTTON_TEXT.goToSignUp : BUTTON_TEXT.goToLogin}
        </Link>
      </div>
    </div>
  );
}
