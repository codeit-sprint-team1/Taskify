import { SignFooter, SignHeader } from '@/components/sign';
import SignUpForm from '@/components/sign/form/SignUpForm';
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
