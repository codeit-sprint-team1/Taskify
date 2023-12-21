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
  return (
    <main className="bg-gray10 h-full overflow-y-scroll flex-center py-150pxr">
      <section className="flex-center flex-col ">
        {header}
        {form}
        {footer}
      </section>
    </main>
  );
}
