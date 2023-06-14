import { StrictMode } from 'react';
import 'tailwindcss/tailwind.css';
import * as ReactDOM from 'react-dom/client';
import App, {Redirect} from './app/App';
import TSPMap from "./app/TSPMap/TSPMap";
import {RootRoute, Route, Router, RouterProvider} from "@tanstack/router";
import LoginPage from "./app/Auth/LoginPage";
import {AppContext, AppState} from "./store/appStore";

const rootRoute = new RootRoute({
    component: App,
})

const DefaultPathRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '*',
    component: Redirect,
})

const TSPRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/tsp',
    component: TSPMap,
})

const LoginRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/auth',
    component: LoginPage,
});

const routeTree = rootRoute.addChildren([LoginRoute, DefaultPathRoute, TSPRoute]);

const router = new Router({routeTree});

declare module '@tanstack/router' {
    interface Register {
        router: typeof router,
    }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
      <AppContext.Provider value={new AppState()}>
          <RouterProvider router={router}/>
      </AppContext.Provider>
  </StrictMode>
);
