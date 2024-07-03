
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './layouts/Layout'
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import AddHotel from './pages/AddHotel'
import {useAppContext} from './contexts/AppContext'
import MyHotels from './pages/MyHotels';

function App() {
  const {isLoggedIn} = useAppContext()

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={
          <Layout>
            <p>HomePage</p>
        </Layout>} />
        <Route path='/search' element={
          <Layout>
          <p>Search Page</p>
         </Layout>} />

         <Route path='/register' element={<Layout><Register /></Layout>  } />

         <Route path='/sign-in' element={<Layout><SignIn /></Layout>} />

         {isLoggedIn && (
          <>
          <Route 
          path='/add-hotel'
          element={
            <Layout>
              <AddHotel />
            </Layout>
          }
          />
          <Route 
          path='/add-hotels'
          element={
            <Layout>
              <MyHotels />
            </Layout>
          }
          />
          </>
         )}
      </Routes>
    </Router>
    </>
  )
}

export default App
