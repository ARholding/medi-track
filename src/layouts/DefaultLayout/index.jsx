import React from 'react';
import Header from '../../components/Header/index'; 


const DefaultLayout = ({ children }) => {
  return (
    <div className="default-layout">
      <Header />
      <main className="layout-content">
        {children}
      </main>
    </div>
  );
}

export default DefaultLayout;
