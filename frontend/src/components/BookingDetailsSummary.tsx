import { HotelType } from "../../../backend/src/shared/types";

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

const BookingDetailsSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  hotel,
}: Props) => {
  return (
    <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
      <h2 className="text-xl font-bold">Sua Reserva</h2>
      <div className="border-b py-2">
        Localização:
        <div className="font-bold">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
      </div>
      <div className="flex justify-between">
        <div>
          Inicio:
          <div className="font-bold"> {checkIn.toDateString()}</div>
        </div>
        <div>
          Fim:
          <div className="font-bold"> {checkOut.toDateString()}</div>
        </div>
      </div>
      <div className="border-t border-b py-2">
        Total de Noites:
        <div className="font-bold">{numberOfNights} noites</div>
      </div>

      <div>
        Convidados{" "}
        <div className="font-bold">
          {adultCount} adultos & {childCount} crianças
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;