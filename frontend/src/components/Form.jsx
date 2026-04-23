import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  fullName: yup.string().required('El nombre completo es obligatorio'),
  email: yup.string().email('Correo electrónico no válido').required('El correo electrónico es obligatorio'),
  age: yup
    .number()
    .typeError('La edad debe ser un número')
    .positive('La edad debe ser número positivo')
    .integer('La edad debe ser número entero')
    .required('La edad es obligatoria'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es obligatoria'),
  confirmPassword: yup
    .string().oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir').required('Confirmar contraseña es obligatorio'),
})

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver:
    yupResolver(schema),
    mode: 'onChange',
  }
  )

  const onSubmit = (data) => {
    console.log(data)
  }

  return (

    <>
      <div className='min-h-screen bg-gray-100 flex items-center justify-center'>

        <div className='bg-white p-8 rounded-xl shadow-md w-full max-w-md'>
          <h1 className='text-2x1 font-bold mb-6 text-center text-blue-700'>Registro de usuario</h1>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <input
              type='text'
              placeholder='Nombre completo'
              {...register('fullName')}
              className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
            {errors.fullName && <p className='text-red-500 text-sm'>{errors.fullName.message}</p>}
            <input
              type='text'
              placeholder='Correo electrónico'
              {...register('email')}
              className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
            {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
            <input
              type='text'
              placeholder='Edad'
              {...register('age')}
              className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
            {errors.age && <p className='text-red-500 text-sm'>{errors.age.message}</p>}
            <input
              type='password'
              placeholder='Contraseña'
              {...register('password')}
              className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
            {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
            <input
              type='password'
              placeholder='Confirmar contraseña'
              {...register('confirmPassword')}
              className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
            {errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword.message}</p>}
            <input
              type='submit'
              value='Registrarse'
              className='w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer'
            />
          </form>
        </div>
      </div>
    </>
  )
}
