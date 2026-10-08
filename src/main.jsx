import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/redux/store'
import './index.css'
import App from './App.jsx'
import { CourseProvider } from './context/CourseContext.jsx'

/**
 * Root Entry Point
 * Sesuai instruksi STEP 3:
 * Menghubungkan file store.js ke root aplikasi menggunakan Provider dari react-redux
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <CourseProvider>
        <App />
      </CourseProvider>
    </Provider>
  </StrictMode>,
)
