import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
  About,
  Error,
  HomeLayout,
  Landing,
  Login,
  Profile,
  Register,
} from './pages'
import { ErrorElement } from './components'

import { store } from './store'
import { action as registerAction } from './pages/Register'
import { action as loginAction } from './pages/Login'
import { loader as profileLoader } from './pages/Profile'
import { loader as loginLoader } from './pages/Login'
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction(store),
        loader: loginLoader(store),
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
        errorElement: <ErrorElement />,
      },
      {
        path: 'profile',
        element: <Profile />,
        loader: profileLoader(store),
        errorElement: <ErrorElement />,
      },
    ],
  },
])
const App = () => {
  return <RouterProvider router={router} />
}

export default App
