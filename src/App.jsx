import './App.scss'
import Home from './components/Home.jsx'
import Navbar from './components/Navbar.jsx'
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
      <Navbar />
      <Home />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
