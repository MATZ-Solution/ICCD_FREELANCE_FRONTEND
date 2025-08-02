import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from '../routes/router'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from "react";
import ICCDLoader from './component/loader';


function App() {

  return (
    <div >
      <ToastContainer position="top-center" autoClose={3000} />
      {/* <Suspense fallback={<ICCDLoader />}> */}
        <RouterProvider router={router} />
      {/* </Suspense> */}
    </div>
  )
}

export default App
