import './App.scss';
import {
  BrowserRouter as Router
} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import NavHeader from './components/Navigation/NavHeader'
import { useEffect, useState, useContext } from 'react';
import { Rings } from 'react-loader-spinner'
import AppRoute from './Routes/AppRoutes'
import { UserContext } from './context/UserContext';
import { Scrollbars } from 'react-custom-scrollbars'

function App() {

  const { user } = useContext(UserContext);
  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    let windowHeight = window.innerHeight;
    setScrollHeight(windowHeight);
  }, [user])
  return (

    <Scrollbars autoHide style={{ height: scrollHeight }}>
      <Router>
        {user && user.isLoading ? (
          <div className='loading-container'>
            <Rings
              height="80"
              width="80"
              color="#1877f2"
              ariaLabel="loading"
            />
            <div>Loading data...</div>

          </div>

        ) : (
          <>
            <div className='app-header'>
              <NavHeader />
            </div>

            <div className='app-container'>
              <AppRoute />
            </div>

          </>
        )}

        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </Scrollbars>

  );
}

export default App;
