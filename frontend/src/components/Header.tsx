import {Link} from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'
import SignOutButton from './SignOutButton'

const Header = () => {
  const {isLoggedIn} = useAppContext()

  return (
    <div className='bg-blue-800 py-6'>
        <div className="container mx-auto flex justify-between">
            <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to='/'>
                    TransitHotels.com
                    </Link>
            </span>
            <span className='flex space-x-2'>
              {isLoggedIn ? (
              <>
              <Link className='flex items-center text-white px-3 font-bold hover:bg-blue-600  rounded-lg' to='/my-bookings'>Minahs Reservas</Link>
              <Link className='flex items-center text-white px-3 font-bold hover:bg-blue-600  rounded-lg' to='/my-hotels'>Meu Hotel</Link>
              <SignOutButton />
              </>
              ) : (
                <Link 
                to='/sign-in' 
                className='flex items-center bg-gray-200 text-blue-800 px-3 font-bold hover:bg-gray-100 rounded-lg' >
                Acessar
                  
                </Link>
              )}
                
            </span>
        </div>
    </div>
  )
}

export default Header