import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Welcome from './pages/Welcome'
import Home from './pages/Home';


function App() {
  return (
    <Router>
      <Routes>
        {/* 首次进入页面时重定向到/welcome */}
        <Route path='*' element={<Navigate to="/welcome"/>} />
        
        <Route path="/welcome" element={<Welcome />} ></Route>
        <Route path='/userhome' element={<Home privilege="user"/>}/>
        <Route path='/adminhome' element={<Home privilege="admin"/>}/>
      </Routes>
    </Router>
  );
}

export default App;