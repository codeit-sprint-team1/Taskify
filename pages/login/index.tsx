import { LoginForm, SignFooter, SignHeader } from '@/components/index';
import SignLayout from '@/page-layout/SignLayout';

export default function LoginPage() {
  return (
    <>
      <SignLayout
        header={<SignHeader />}
        form={<LoginForm />}
        footer={<SignFooter />}
      ></SignLayout>
    </>
  );
}
