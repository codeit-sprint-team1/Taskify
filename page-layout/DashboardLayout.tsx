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
    <div className="flex w-full h-full">
      <div>{sidebar}</div>
      <div className="flex flex-col grow shrink-0 overflow-hidden w-full basis-0pxr">
        <div>{header}</div>
        <div className="flex-1 overflow-hidden">{main}</div>
      </div>
    </div>
  );
}
