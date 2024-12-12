import React from 'react';
import { Container } from '@mui/material';
import { Header, Footer, NavigationTabs } from '@/components';

type LayoutProps = {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='bg-white min-h-screen'>
      <Header />
      <NavigationTabs />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {children}
      </Container>
      <Footer />
    </div>
  );
};
