import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import { useOllama } from '../hooks/useOllama'

const schema = yup.object({
  userInput: yup
    .string()
    .min(3, 'El mensaje debe tener mínimo 3 caracteres')
    .required('El mensaje es obligatorio')
})

export const ChatBot = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })
  const { state, dispatch } = useContext(ChatContext)
  const { sendMessage, loading } = useOllama()

  const handlePregunta = async (data) => {
    console.log(data)
    dispatch({ type: 'ADD_MESSAGE', payload: { from: 'user', text: data.userInput } })
    dispatch({ type: 'SET_LOADING', payload: true })

    setLoading(true)
    reset()
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
              state.messages.map((msj, index) => (
                <p key={index}>
                  <strong>{msj.from === 'user' ? 'Tú: ' : 'Bot: '}</strong>
                  {msj.text}
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
