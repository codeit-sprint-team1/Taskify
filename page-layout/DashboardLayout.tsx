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
      <div className="flex flex-col grow shrink-0 overflow-hidden w-full basis-0pxr">
        <div>{header}</div>
        <div className="flex-1 overflow-scroll">{main}</div>
      </div>
    </div>
  );
}
