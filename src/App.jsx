import { yupResolver } from '@hookform/resolvers/yup/src/yup.js'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  userInput: yup
    .string()
    .min(3, 'La pregunta debe tener al menos 3 caracteres')
    .required('La pregunta es obligatoria'),
})

export const App = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const handlePregunta = (data) => {
    console.log(data)
  }

  return (
    <>
      <h1>ChatBot</h1>
      <form onSubmit={handleSubmit(handlePregunta)}>
        <input
          type='text'
          {...register('userInput')}
          className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
        />
        {errors.userInput && <p className='text-red-500 text-sm'>{errors.userInput.message}</p>}
        <button className='w-full py-2 rounded transition cursor-ponter bg-blue-600 text-white hover:bg-blue-700'>Preguntar</button>
      </form>
    </>
  )
}
