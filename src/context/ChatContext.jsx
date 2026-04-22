import { createContext, useReducer } from 'react'

// 1. Crear el contexto global
export const ChatContext = createContext() // Aquí puedes definir el estado inicial y el reducer para manejar las acciones relacionadas con el chat

const initialState = {
  messages: []
}

const chatReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      console.log('Agregando mensaje...')
      console.log(state)
      return { ...state, messages: [...state.messages, action.payload] }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    default:
      return state
  }
}

// 2. Crear proveedor

export const ChatProvider = ({ children }) => { // Aquí puedes implementar la lógica para manejar el estado del chat y proporcionar funciones para actualizarlo
  const [state, dispatch] = useReducer(chatReducer, initialState)
  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}
