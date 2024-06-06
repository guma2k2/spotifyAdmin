import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './styles/global.scss'
import Home from './routes/home/Home'
import Navbar from './components/navbar/Navbar'
import Footer from './components/Footer/Footer'
import User from './routes/user/User'
import Song from './routes/song/Song'
import Playlist from './routes/playlist/Playlist'
import Category from './routes/category/Category'
import Menu from './components/Menu/Menu'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SharedCategory from './routes/shared/SharedCategory'
import SharedPlaylist from './routes/shared/SharedPlaylist'
import SongAdd from './routes/song/SongAdd'
import Album from './routes/album/Album'
import Review from './routes/review/Review'
import Sentiment from './routes/sentiment/Sentiment'
import Login from './routes/login/Login'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/protectedRoute/ProtectedRoute'

function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient} >
        {/* <ProtectedRoute> */}
          <div className="main">
            <Navbar />
            <div className='container'>
              <div className="menuContainer">
                <Menu />
              </div>
              <div className="contentContainer">
                <Outlet />
              </div>
            </div>
            <Footer />
          </div>
        {/* </ProtectedRoute> */}
      </QueryClientProvider>
    )
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/user",
          element: <User />
        },
        {
          path: "/album",
          element: <Album />
        },
        {
          path: "/song",
          element: <Song />
        },
        {
          path: "/song/add",
          element: <SongAdd />
        },
        {
          path: "/playlist",
          element: <Playlist />
        },
        {
          path: "/review",
          element: <Review />
        },
        {
          path: "/category",
          element: <Category />
        },
        {
          path: "/sentiment",
          element: <Sentiment />
        },
        {
          path: "/shared/:id/:tag",
          element: <SharedPlaylist />
        },
        {
          path: "/sharedCategory/:id/:tag",
          element: <SharedCategory />
        }
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
  ])


  return <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
}

export default App
