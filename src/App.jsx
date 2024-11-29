import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import PicsPage from './pages/PicsPage';
import BooksPage from './pages/BooksPage';
import WorkEducationPage from './pages/WorkEducationPage';
import './styles/App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/pics',
    element: <PicsPage />,
  },
  {
    path: '/books',
    element: <BooksPage />,
  },
  {
    path: '/work-education',
    element: <WorkEducationPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
