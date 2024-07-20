import React, { useContext } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthContext } from './services/AuthContext';

import Startpage from './views/login/Startpage';
import Errorurl from './views/Errorurl';
import Login from './views/login/Login';
import Createacc from './views/login/Createacc';
import Recoverpwd from './views/login/Recoverpwd';
import Recoverpwdtel from './views/login/Recoverpwdtel';
import Recoverpwd2 from './views/login/Recoverpwd2';
import Recoverpwd2tel from './views/login/Recoverpwd2tel';
import Restore_pwd from './views/login/Restorepwd';
import Restore_pwdtel from './views/login/Restorepwdtel';
import OriginPage from './views/UI/Originpage';
import ProfileOriPage from './views/Profile/profileOriPage';

// import Calendar_view from "./views/UI/Calendar";
// import Alarm from "./views/UI/Alarm";
// import Chrono from "./views/UI/Chrono";
// import Timer from "./views/UI/Timer";
// import Clock from "./views/UI/Clock";
// import Invitation from "./views/UI/Invtitation";

const router = createBrowserRouter([
  { //login
    path: '/',
    element: <Startpage />, 
    errorElement: <Errorurl />,   
  },
  { //login
    path: '/login',
    element: <Login />,  
  },
  { //create acount
    path: '/create_acount',
    element: <Createacc />,
  },
  { //Recover password MailTrap
    path: '/recover_pwd',
    element: <Recoverpwd />,
  },
  { //Recover password MailTrap por telefono
    path: '/recover_pwdtel',
    element: <Recoverpwdtel />,
  },
  { //Restore password Javateam
    path: '/recover_pwdjt',
    element: <Recoverpwd2 />,
  },
  { //Restore password Javateam
    path: '/recover_pwdteljt',
    element: <Recoverpwd2tel />,
  },
  { //Restore password
    path: '/restore_pwd/:id',
    element: <Restore_pwd />,
  },
  { //Restore password
    path: '/restore_pwdtel/:id',
    element: <Restore_pwdtel />,
  },
  {
    path: '/dailyplan/:id',
    element: <OriginPage />,
  },
  {
    path: '/dailyplanconfig/:id',
    element: <ProfileOriPage />,
  },
]);

function App() {
  // const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/users")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  return (
    <div className="App">
      <div>
        <RouterProvider router={router}/>
      </div>
    </div>
  );
}

export default App;
