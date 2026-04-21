import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useReducer, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object({
  userInput: yup
    .string()
    .min(3, 'El mensaje debe tener mínimo 3 caracteres')
    .required('El mensaje es obligatorio')
})

export const App = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })
  // Estado que guarda la respuesta de gemma
  const [response, setResponse] = useState('')

  const handlePregunta = async (data) => {
    console.log(data)
    setLoading(true)
    reset() // Limpiar el input después de enviar la pregunta
  }

  return (
    <>
      <div className='min-h-screen bg-gray-950 flex items-center justify-center p-4'>
        <div className='w-full max-w-lg bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-4'>

          {/* Header */}
          <div className='flex items-center gap-3 pb-4 border-b border-gray-800'>
            <h1 className='text-lg font-medium text-gray-100'>ChatBot</h1>
            <span className='ml-auto text-xs bg-blue-950 text-blue-400 font-medium px-3 py-1 rounded-full'>
              En línea
            </span>
          </div>

          {/* Response area */}
          <div className='min-h-20 bg-gray-800 rounded-xl px-4 py-3 text-sm text-gray-400 leading-relaxed'>

            {
              state.messages.map((msg, index) => (
                <p key={index}>
                  <strong>{msg.from === 'user' ? 'Tú' : 'Gemma'}:</strong> {msg.text}
                </p>
              ))
            }

            {loading && (
              <p className='italic text-gray-500'>Generando respuesta...</p>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(handlePregunta)} className='flex flex-col gap-2'>
            <div className='flex items-center bg-gray-800 border border-gray-700 rounded-xl px-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition'>
              <input
                type='text'
                {...register('userInput')}
                placeholder='Escribe tu pregunta...'
                className='flex-1 bg-transparent border-none outline-none py-2.5 text-sm text-gray-100 placeholder-gray-500'
              />
            </div>

            {errors.userInput && (
              <p className='text-red-400 text-xs px-1'>{errors.userInput.message}</p>
            )}

            <button
              type='submit'
              className='w-full bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-sm font-medium py-2.5 rounded-xl transition-all cursor-pointer'
            >
              Preguntar
            </button>
          </form>

        </div>
      </div>
    </>
  )
}
