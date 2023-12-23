import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface SignInLayoutProps {
  header: ReactNode;
  form: ReactNode;
  footer: ReactNode;
}

export default function SignLayout({
  header,
  form,
  footer,
}: SignInLayoutProps) {
  const router = useRouter();
  const isLoginPage = router.pathname === '/login';

  return (
    <main
      className={`bg-gray10 overflow-y-scroll flex-center ${
        isLoginPage ? 'h-screen' : 'h-full py-50pxr'
      }`}
    >
      <section className="flex-center flex-col ">
        {header}
        {form}
        {footer}
      </section>
    </main>
  );
}
