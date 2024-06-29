
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './layouts/Layout'

function App() {

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
      </Routes>
    </Router>
    </>
  )
}

export default App
