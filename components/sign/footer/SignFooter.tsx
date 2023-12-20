import Link from 'next/link';
import { BUTTON_TEXT, LINK_TEXT } from '../constants';
import { useRouter } from 'next/router';
import { ROUTE } from '@/constants/constants';

export function SignFooter() {
  const router = useRouter();
  const isLoginPage = router.pathname === '/login';

  return (
    <div>
      <span>{isLoginPage ? LINK_TEXT.isNotMember : LINK_TEXT.isMember}</span>
      <Link href={isLoginPage ? ROUTE.signUp : ROUTE.login}>
        {BUTTON_TEXT.goToLogin}
      </Link>
    </div>
  );
}
