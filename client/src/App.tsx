import { Link, Outlet } from 'react-router-dom'
import './App.css'

function App() {

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
