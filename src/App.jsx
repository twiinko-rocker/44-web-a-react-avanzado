import { useForm } from 'react-hook-form'

export const App = () => {
  const { register, handleSubmit } = useForm()

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
        <button className='w-full py-2 rounded transition cursor-ponter bg-blue-600 text-white hover:bg-blue-700'>Preguntar</button>
      </form>
    </>
  )
}
