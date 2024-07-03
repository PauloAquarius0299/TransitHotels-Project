import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import * as apiClient from '../api-client';
import { BsMap, BsBuilding } from "react-icons/bs";
import {BiMoney, BiStar} from 'react-icons/bi';

const MyHotels = () => {
  const {data: hotelData} = useQuery('fetchMyHotels', apiClient.fetchMyHotels, {
    onError: () => {},
  });

  if(!hotelData){
    return <span>No Hotels found</span>
  }
  return (
    <div className='space-x-5'>
        <span className="flex justify-between">
            <h1 className="text-3xl font-bold">Meus Hoteis</h1>
            <Link to='/add-hotel' className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-400">
            Add Hotel
            </Link>
        </span>
        <div className="grid grid-cols-1 gap-8">
          {hotelData.map((hotel) => (
            <div className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 ">
              <h2 className="text-2xl font-bold">{hotel.name}</h2>
              <div className="whitespace-pre-line">{hotel.description}</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-slate-300 rounded-sm p-3 flex items-center mt-2">
                  <BsMap className='mr-1' />
                  {hotel.city}, {hotel.country}
                </div>
                <div className='border border-slate-300 rounded-sm p-3 flex items-center mt-2'>
                  <BsBuilding className='mr-1' />
                  {hotel.type}
                </div>
                <div className='border border-slate-300 rounded-sm p-3 flex items-center mt-2'>
                  <BiMoney className='mr-1' />
                  ${hotel.pricePerNight} por noite
                </div>
                <div className='border border-slate-300 rounded-sm p-3 flex items-center mt-2'>
                  <BiMoney className='mt-1' />
                  {hotel.adultCount} adultos, {hotel.childCount} crianças
                </div>
                <div className='border border-slate-300 rounded-sm p-3 flex items-center mt-2'>
                  <BiStar className="mr-1" />
                  {hotel.starRating} Avaliação
                </div>
              </div>
              <span className="flex justify-end">
                <Link  to={`/edit-hotel/${hotel._id}`}
                className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-400">+ Detalhes</Link>
              </span>
            </div>
          ))}
        </div>
    </div>
  )
}

export default MyHotels