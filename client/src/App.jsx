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
import { action as registerAction } from './pages/Register'
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
