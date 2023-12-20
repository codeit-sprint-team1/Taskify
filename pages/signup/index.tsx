import { SignFooter, SignHeader, SignUpForm } from '@/components/index';
import SignLayout from '@/page-layout/SignLayout';

export default function SignUpPage() {
  return (
    <>
      <SignLayout
        header={<SignHeader />}
        form={<SignUpForm />}
        footer={<SignFooter />}
      ></SignLayout>
    </>
  );
}
