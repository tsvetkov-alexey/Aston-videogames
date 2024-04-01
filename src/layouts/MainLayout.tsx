import { Header } from '../components/Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
