import SignUpForm from '@/components/sign/form/SignUpForm';
import SignHeader from '@/components/sign/header/SignHeader';
import SignLayout from '@/page-layout/SignLayout';

export default function SignUpPage() {
  return (
    <>
      <SignLayout header={<SignHeader />} form={<SignUpForm />}></SignLayout>
    </>
  );
}
