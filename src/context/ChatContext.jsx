import { createContext, useReducer } from 'react'

// 1. Crear el contexto global
export const ChatContext = createContext()

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

// dispatch({ type: 'ADD_MESSAGE', payload: { from: 'bot', text: res.data.response } })

// 2. Crear proveedor

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState)
  return (
    <ChatContext.Provider values={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}
