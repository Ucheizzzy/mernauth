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
const App = () => {
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
        },
      ],
    },
  ])
  return <RouterProvider router={router}>App</RouterProvider>
}

export default App
