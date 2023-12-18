import { ReactNode } from 'react';

type SignInLayoutProps = {
  header: ReactNode;
  form: ReactNode;
  oauth: ReactNode;
};

export const SignLayout = ({ header, form, oauth }: SignInLayoutProps) => {
  return (
    <div>
      <div>
        {header}
        {form}
        {oauth}
      </div>
    </div>
  );
};
