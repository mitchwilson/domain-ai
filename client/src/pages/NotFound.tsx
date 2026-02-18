import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section>
      <h2>404 — Not Found</h2>
      <p>The page you requested could not be found.</p>
      <p>
        <Link to="/">Go back home</Link>
      </p>
    </section>
  )
}
