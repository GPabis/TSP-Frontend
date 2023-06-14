import {observer} from "mobx-react-lite";
import {Link, Navigate, Outlet, useNavigate} from "@tanstack/router";
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
  const {auth} = useContext(AppContext)

  return <div>
    {auth.isAuth && <Link className='absolute top-2 left-2' to={'/tsp'}>Go to map</Link>}
    <Outlet />
  </div>
});
export default App;
