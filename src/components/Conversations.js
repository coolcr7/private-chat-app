import React, { useState, useEffect, useRef } from 'react'
import { useConversation } from '../context/ConversationProvider'
import { ListGroup } from 'react-bootstrap'
import { db, auth } from '../config/firebase'
import { query, where, onSnapshot, collection, getDocs } from 'firebase/firestore'
export default function Conversations() {
  console.log("conversation mount")
  const [firebaseConversation, setFirebaseConversation] = useState([])

  // console.log("this is data",snapshot.docs[0]?.data()?.conversation)
   
  const dbRef = collection(db, "users")
  const dbRefConversation = collection(db, "converstation")
  const q = query(dbRef, where("email", "==", auth.currentUser?.email || ""))
  const [refresh, setRefresh] = useState(0)
  async function getData() {
      onSnapshot(q,(snapshot) => {
      console.log("inside snapshot")
      console.log(snapshot.docs[0]?.data().conversation, "this is test")
      setFirebaseConversation(snapshot.docs[0]?.data()?.conversation)
    }
    )
  }
  useEffect(() => {
    getData()
  }, [refresh])

  console.log(firebaseConversation, "this is end")

  const { formatedConversations: conversations } = useConversation()
  // console.log(conversations)
  const { setActiveId, activeId } = useConversation()
  const {setRefreshState}=useConversation()
  const handleSelect = (index) => {
    setActiveId(index)
    setRefreshState(i=>i+1)

  }
  const handleRefresh = () => {
    setRefresh(i => i + 1)
  }

  return (
    <div>
      <div onClick={handleRefresh}>
        refresh
      </div>
      <ListGroup variant='flush' >
        {firebaseConversation && firebaseConversation.map((conversation) => (
          
          <ListGroup.Item key={conversation.roomId}
            className='border-top border-bottom'
            action
            onClick={() => { return handleSelect(conversation.roomId) }}
            active={conversation.roomId == activeId}
          >
            {conversation.room}
          </ListGroup.Item>
          
        ))}
      </ListGroup>
    </div>
  )
}
