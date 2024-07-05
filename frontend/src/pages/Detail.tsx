
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import * as apiClient from '../api-client';
import { AiFillStar } from 'react-icons/ai';
import GuestInfoForm from '../forms/GuestInfoForm/GuestInfoForm';

interface Hotel {
  _id: string;
  name: string;
  starRating: number;
  imageUrls: string[];
  facilities: string[];
  description: string;
  pricePerNight: number;
}

const Detail = () => {
  const { hotelId } = useParams<{ hotelId: string }>();

  const { data: hotel } = useQuery<Hotel>(
    'fetchHotelById',
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  if (!hotel) {
    return <></>;
  }

  return (
    <div className='space-y-6'>
      <div>
        <span className='flex'>
          {Array.from({ length: hotel.starRating }).map((_, index) => (
            <AiFillStar key={index} className='fill-yellow-400' />
          ))}
        </span>
        <h1 className='text-3xl font-bold'>{hotel.name}</h1>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        {hotel.imageUrls.map((image: string, index: number) => (
          <div key={index} className='h-[300px] w-full'>
            <img
              src={image}
              alt={hotel.name}
              className='rounded-md w-full h-full object-cover object-center'
            />
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-2'>
        {hotel.facilities.map((facility: string, index: number) => (
          <div key={index} className='border border-slate-300 rounded-sm p-3'>
            {facility}
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-col-2[2fr_1fr]'>
        <div className='whitespace-pre-line'>{hotel.description}</div>
        <div className='h-fit'>
          <GuestInfoForm
            pricePerNight={hotel.pricePerNight}
            hotelId={hotel._id}
          />
        </div>
      </div>
    </div>
  );
}

export default Detail;
