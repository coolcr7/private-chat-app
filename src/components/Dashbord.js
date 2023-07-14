import React from 'react'
import Sidebar from './Sidebar'
import { useConversation } from '../context/ConversationProvider'
import OpenConversation from './OpenConversation'

export default function Dashbord() {
  const {activeId}=useConversation()
  console.log("dashbord mount")
  return (
    <div style={{height:"100vh"}} className="d-flex">
      <Sidebar />
      {activeId&&activeId!=0 && <OpenConversation id={activeId}/>}
      
    </div>
  )
}
