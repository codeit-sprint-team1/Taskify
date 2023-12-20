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
    <div>
      <div>
        {header}
        {form}
        {footer}
      </div>
    </div>
  );
}
