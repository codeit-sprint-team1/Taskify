import { ReactNode } from 'react';

type SignInLayoutProps = {
  header: ReactNode;
  form: ReactNode;
};

export default function SignLayout({ header, form }: SignInLayoutProps) {
  return (
    <div>
      <div>
        {header}
        {form}
      </div>
    </div>
  );
}
