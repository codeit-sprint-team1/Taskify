import React, { ReactNode } from 'react';

interface MyPageLayoutProps {
  mypageProfile: ReactNode;
  passwordModify: ReactNode;
}

function MyPageLayout({ mypageProfile, passwordModify }: MyPageLayoutProps) {
  return (
    <div className="mx-20pxr mobile:mx-12pxr ">
      {mypageProfile}
      {passwordModify}
    </div>
  );
}

export default MyPageLayout;
