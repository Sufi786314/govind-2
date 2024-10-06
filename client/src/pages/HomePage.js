import React from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';
import '../styles/HomePage.css';
// Assuming you will create a CSS file for styling

const HomePage = () => {
  const [auth, setAuth] = useAuth();

  return (
    <Layout title={'Welcome to Soul Aid'}>
    </Layout>
  ); 
};

export default HomePage;
