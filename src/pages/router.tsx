import React, { FC } from 'react';
import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from 'react-router-dom';
import Path from '../config/path';
import history from '../config/history';
import Index from './index/index';
import Print from './print/index';

const App: FC = () => {
  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path={Path.index} element={<Index />} />
        <Route path={Path.print} element={<Print />} />
      </Routes>
    </HistoryRouter>
  );
};
export default App;
