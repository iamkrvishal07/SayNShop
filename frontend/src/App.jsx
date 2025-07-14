import React, { useContext } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Nav from './component/Nav'
import Ai from './component/Ai'
import { userDataContext } from './context/UserContext'

import Home from './pages/Home'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Collections from './pages/Collections'
import Product from './pages/Product'
import Contact from './pages/Contact'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Order'
import NotFound from './pages/NotFound'

function App() {
  const { userData } = useContext(userDataContext)
  const location = useLocation()

  const ProtectedRoute = (Component) =>
    userData ? <Component /> : <Navigate to="/login" state={{ from: location.pathname }} />

  return (
    <>
      <ToastContainer />
      {userData && <Nav />}

      <Routes>
        <Route path="/login" element={userData ? <Navigate to={location.state?.from || "/"} /> : <Login />} />
        <Route path="/signup" element={userData ? <Navigate to={location.state?.from || "/"} /> : <Registration />} />
        <Route path="/" element={ProtectedRoute(Home)} />
        <Route path="/collection" element={ProtectedRoute(Collections)} />
        <Route path="/product" element={ProtectedRoute(Product)} />
        <Route path="/contact" element={ProtectedRoute(Contact)} />
        <Route path="/productdetail/:productId" element={ProtectedRoute(ProductDetail)} />
        <Route path="/cart" element={ProtectedRoute(Cart)} />
        <Route path="/placeorder" element={ProtectedRoute(PlaceOrder)} />
        <Route path="/order" element={ProtectedRoute(Order)} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {userData && <Ai />}
    </>
  )
}

export default App
