import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Summary from './pages/Summary';
import SketchTimings from './pages/SketchTimings';
import UserMetrics from './pages/UserMetrics';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/summary" element={<Summary />} />
          <Route path="/sketch-timings" element={<SketchTimings />} />
          <Route path="/user-metrics" element={<UserMetrics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
