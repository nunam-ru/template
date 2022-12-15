import React from 'react';
import { Routes, Route } from "react-router-dom";

import { Search } from '../../pages/Search';
import { Music } from '../../pages/Music';
import { NotFound } from '../../pages/NotFound';

export const Main = () => {
  return (
    <Routes>
      <Route path='/' element={<Music/>}></Route>
      <Route path='/music' element={<Music/>}></Route>
      <Route path='/search' element={<Search/>}></Route>
      <Route path='*' element={<NotFound/>}></Route>
    </Routes>
  );
}

export default Main;