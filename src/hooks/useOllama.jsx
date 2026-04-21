import axios from 'axios'
import { useReducer, useState } from 'react'

// custom hook relacionado con consumo de API de Ollama

const initialState = {
  messages: []
}

const chatReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      console.log('Agregando mensaje...')
      console.log(state)
      return { ...state, messages: [...state.messages, action.payload] }
    default:
      return state
  }
}

export const useOllama = async () => {
  const [loading, setLoading] = useState(false)
  const [state, dispatch] = useReducer(chatReducer, initialState)

  const sendMesage = async (userPrompt) => {
    dispatch({ type: 'ADD_MESSAGE', payload: { from: 'user', text: userPrompt } }) // Agregar la respuesta de gemma al estado

    try {
      const res = await axios.post('http://localhost:11434/api/generate', {
        model: 'gemma2:2b',
        prompt: userPrompt,
        stream: false
      })

      dispatch({ type: 'ADD_MESSAGE', payload: { from: 'gemma', text: res.data.response } }) // Agregar la respuesta de gemma al estado

      return res
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return { sendMesage, loading }
}
