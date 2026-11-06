import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-plum-700 focus:px-4 focus:py-2 focus:text-white"
    >
      Skip to content
    </a>
    <Header />
    <main id="main">
      <Home />
    </main>
    <Footer />
  </StrictMode>,
)
