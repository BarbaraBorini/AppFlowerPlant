import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import Home from './views/Home.jsx'
import MyPlants from './views/MyPlants.jsx'
import About from './views/About.jsx'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'my-plants',
          element: <MyPlants />,
        },
        {
          path: 'about',
          element: <About />,
        },
      ],
    },
  ],
  {

    basename: "/AppFlowerPlant",
  }
)

export default function App() {
  return <RouterProvider router={router} />
}
