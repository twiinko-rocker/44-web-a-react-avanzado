import { yupResolver } from '@hookform/resolvers/yup/src/yup.js'
import { useState } from 'react'
import axios from 'axios'
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
  })

  // Estado para almacenar la respuesta del chatbot
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePregunta = async (data) => {
    console.log(data)
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:11434/api/generate', {
        model: 'gemma2:2b',
        prompt: data.userInput,
        stream: false
      })
      setResponse(res.data.response)
      console.log(res.data)
    } catch (error) {
      console.error('Error al enviar la pregunta:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className='min-h-screen bg-gray-950 text-white flex flex-col items-center justify-start px-4 py-16'>
        <div className='w-full max-w-2xl'>
          <h1 className='text-4xl font-bold text-center mb-8 text-white tracking-tight'>
            🤖 ChatBot
          </h1>

          <form onSubmit={handleSubmit(handlePregunta)} className='flex flex-col gap-3'>
            <input
              type='text'
              {...register('userInput')}
              placeholder='Escribe tu pregunta...'
              className='w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
            />
            {errors.userInput && (
              <p className='text-red-400 text-sm'>{errors.userInput.message}</p>
            )}
            <button className='w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition cursor-pointer'>
              Preguntar
            </button>
          </form>

          {loading && (
            <p className='mt-6 text-center text-gray-400 animate-pulse'>Cargando...</p>
          )}

          {response && (
            <div className='mt-6 p-5 rounded-xl bg-gray-800 border border-gray-700'>
              <p className='text-gray-100 text-base leading-relaxed'>{response}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
