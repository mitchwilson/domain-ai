import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ width: '100%' }}>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>

      <main>
        {/* Route outlet renders the matched child route component */}
        <Outlet />
      </main>
    </div>
  )
}

export default App
