import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import List from './pages/List';
import Sidebar from './components/Sidebar';
import { Box, CssBaseline, Toolbar } from '@mui/material';

const App: React.FC = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar /> {/* This Toolbar is used to offset the content below the AppBar */}
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/users" element={<List />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;