import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Fights from './components/Fights';
import SelectCharacters from './components/SelectCharacters';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<SelectCharacters />} />
        <Route path="fights/:id1/:id2" element={<Fights />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
