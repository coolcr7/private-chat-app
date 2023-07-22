import React, { useContext, useState, } from 'react'
import Cookies from "universal-cookie"
import useLocalStorage from '../hooks/useLocalStorage';

const ConversationContext = React.createContext()
const cookies=new Cookies();
export function useConversation() {
  return useContext(ConversationContext)
}

export function ConversationProvider({ children, id }) {

  const [activeId, setActiveId] = useState() 
  const [refreshState,setRefreshState]=useState(0) 
  const [isLogin,setIsLogin]=useState(cookies.get("auth-token"))
  const [user,setUser]=useLocalStorage("user",'')
  const pass_value = {
    setActiveId,
    activeId,
    refreshState,
    setRefreshState,
    isLogin,
    setIsLogin,
    user,
    setUser
  }

  return (
    <div>
      <ConversationContext.Provider value={pass_value} >
        {children}
      </ConversationContext.Provider>

    </div>
  )
}
