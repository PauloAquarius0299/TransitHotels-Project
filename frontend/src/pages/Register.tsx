import {useForm} from 'react-hook-form';
import {useMutation} from 'react-query';
import * as apiClient from '../api-client'
import { useAppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Register = () => {
    const navigate = useNavigate()
    const {showToast} = useAppContext();
    const {register, watch, handleSubmit, formState: {errors}} = useForm<RegisterFormData>()

    const mutation = useMutation(apiClient.register, {
        onSuccess: () => {
            showToast({message: 'Registration Success', type: 'SUCCESS'});
            navigate("/");
        },
        onError: (error: Error)=> {
            showToast({message: error.message, type: 'ERROR'})
        }
    })

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold">Crie uma Conta</h2>
        <div className='flex flex-col md:flex-row gap-5'>
            <label className='text-gray-700 text-sm font-bold'>
                Seu Nome:
                <input className='border rounded w-full py-1 px-2 font-normal' 
                {...register('firstName', {required: 'Esqueceu seu nome'})} ></input>
                {errors.firstName && (
                    <span className='text-red-500'>{errors.firstName.message}</span>
                )}
            </label>
            <label className='text-gray-700 text-sm font-bold'>
                Sobrenome:
                <input className='border rounded w-full py-1 px-2 font-normal'
                {...register('lastName', {required: 'Esqueceu sei sobrenome'})}></input>
                {errors.lastName && (
                    <span className='text-red-500'>{errors.lastName.message}</span>
                )}
            </label>
        </div>
        <label className='text-gray-700 text-sm font-bold'>
                Email:
                <input type='email' className='border rounded w-full py-1 px-2 font-normal'
                {...register('email', {required: 'Esqueceu'})}></input>
                {errors.email && (
                    <span className='text-red-500'>{errors.email.message}</span>
                )}
            </label>
            <label className='text-gray-700 text-sm font-bold'>
                Senha:
                <input type='password' className='border rounded w-full py-1 px-2 font-normal'
                {...register('password', {required: 'Esqueceu',
                    minLength:{
                        value: 6,
                        message: 'A senha deve conter 6 digitos'
                    }
                })}></input>
                {errors.password && (
                    <span className='text-red-500'>{errors.password.message}</span>
                )}
            </label>
            <label className='text-gray-700 text-sm font-bold'>
                Confirmar Senha:
                <input type='password' className='border rounded w-full py-1 px-2 font-normal'
                {...register('confirmPassword', {
                    validate: (val)=>{
                        if(!val){
                            return 'Esqueceu'
                        } else if(watch('password') !==val){
                            return 'Sua senha não deu match'
                        }
                    }
                })}></input>
                {errors.confirmPassword && (
                    <span className='text-red-500'>{errors.confirmPassword.message}</span>
                )}
            </label>
            <span>
                <button type='submit' className='bg-blue-800 text-white font-bold  p-2 hover:bg-blue-600 text-xl rounded-lg'>Registrar</button>
            </span> 
    </form>
  )
}

export default Register