import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm';
import {useMutation} from 'react-query'
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

const AddHotel = () => {
    const {showToast} = useAppContext()

    const {mutate, isLoading} = useMutation(apiClient.addMyHotel, {
        onSuccess: () => {
            showToast({message: 'Hotel adicionado!', type: 'SUCCESS'})
        },
        onError: () => {
            showToast({message: 'Erro ao adicionar hotel', type: 'ERROR'})
        }
    });

    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData)
    };

    return (
        <div>
            <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
        </div>
    )
}

export default AddHotel;