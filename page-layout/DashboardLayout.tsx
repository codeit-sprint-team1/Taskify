import { ReactNode } from 'react';

interface SignInLayoutProps {
  header: ReactNode;
  sidebar: ReactNode;
  main: ReactNode;
}

export default function DashboardLayout({
  header,
  sidebar,
  main,
}: SignInLayoutProps) {
  return (
    <div className="flex w-screen h-screen">
      <div>{sidebar}</div>
      <div className="flex flex-col grow shrink-0">
        <div>{header}</div>
        <div>{main}</div>
      </div>
    </div>
  );
}
