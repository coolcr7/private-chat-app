import React from 'react'
import Sidebar from './Sidebar'
import { useConversation } from '../context/ConversationProvider'
import OpenConversation from './OpenConversation'

export default function Dashbord() {
  const {activeId}=useConversation()
  console.log("dashbord mount")
  return (
    <>
    <Sidebar />
    <div style={{height:"100vh"}} className="d-flex">
      {activeId && <OpenConversation  id={activeId}/>}
    </div>
    </>
  )
}
