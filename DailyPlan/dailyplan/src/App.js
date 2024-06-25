import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import Startpage from './views/login/Startpage';
import Errorurl from './views/Errorurl';
import Login from './views/login/Login';
import Createacc from './views/login/Createacc';
import Recoverpwd from './views/login/Recoverpwd';
import Restore_pwd from './views/login/Restorepwd';
import OriginPage from './views/UI/Originpage';
import Calendar_view from "./views/UI/Calendar";
import Alarm from "./views/UI/Alarm";
import Chrono from "./views/UI/Chrono";
import Timer from "./views/UI/Timer";
import Clock from "./views/UI/Clock";
import Invitation from "./views/UI/Invtitation";
import ProfileOriPage from './views/Profile/profileOriPage';

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
  { //Recover password
    path: '/recover_pwd',
    element: <Recoverpwd />,
  },
  { //Restore password
    path: '/restore_pwd/:id',
    element: <Restore_pwd />,
  },
  {
    path: '/dailyplan/:id',
    element: <OriginPage />,
  },
  {
    path: '/dailyplanconfig/:id',
    element: <ProfileOriPage />,
  }
  // { //calendar
  //   path: '/dailyplan/calendar:id',
  //   element: <Calendar_view />
  // },
  // { //alarm
  //   path: '/dailyplan/alarm/:id',
  //   element: <Alarm />,  
  // },
  // { //chonometer
  //   path: '/dailyplan/chonometer/:id',
  //   element: <Chrono />,
  // },
  // { //timer
  //   path: '/dailyplan/timer/:id',
  //   element: <Timer />,
  // },
  // { //clock
  //   path: '/dailyplan/clock/:id',
  //   element: <Clock />,
  // },
  // { //invitations
  //   path: '/dailyplan/invitation/:id',
  //   element: <Invitation />,
  // },
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
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
