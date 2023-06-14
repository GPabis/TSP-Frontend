import {observer} from "mobx-react-lite";
import {Link, Navigate, Outlet, useNavigate} from "@tanstack/router";
import {useContext, useEffect} from "react";
import {AppContext} from "../store/appStore";

export const Redirect = observer(() => {
  const {auth} = useContext(AppContext)
  const navigate = useNavigate();

  useEffect(() => {
    if(auth.isAuth) {
      navigate({to: '/tsp'});
    }
  }, [auth.isAuth]);

  return <Navigate to='/auth' />
});

export const App = observer(() =>  {
  return <div>
    <Outlet />
  </div>
});
export default App;
