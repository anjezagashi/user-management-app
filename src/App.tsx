import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
