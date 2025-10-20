import { Routes, Route } from 'react-router-dom'
import Home from './Home.jsx'
import Menu from './Menu.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
    </Routes>
  )
}

export default App