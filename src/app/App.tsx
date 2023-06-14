import {observer} from "mobx-react-lite";
import {Navigate, Outlet, useNavigate} from "@tanstack/router";
import {useContext} from "react";
import {AppContext} from "../store/appStore";

export const Redirect = observer(() => {
  const {auth} = useContext(AppContext)

  if(auth.isAuth) {
    return <Navigate to='/tsp' />
  }

  return <Navigate to='/auth' />
});

export const App = observer(() =>  {
  return <div>
    <Outlet />
  </div>
});
export default App;
