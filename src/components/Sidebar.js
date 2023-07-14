import React, { useState } from 'react'
import { Tab, Nav, Button, Modal } from 'react-bootstrap'
import { auth } from '../config/firebase'
import Conversations from './Conversations'
import NewContacts from './NewContacts'
import NewConversations from './NewConversations'
import {signOut} from "firebase/auth"
import { useConversation } from '../context/ConversationProvider'

export default function Sidebar() {
    const {setIsLogin}=useConversation()
    const conversation = "converse"
    const contacts = "contacts"
    const [activeState, setActiveState] = useState(conversation)
    const [modalShow,setModalShow]=useState(false)
    const conversationBool=activeState==conversation
    const [modalBool,setModalBool] =useState(false)
    const handleHide=()=>{
        setModalShow(false)
    }
    const handleClick=()=>{
        setModalBool(false)
        setModalShow(true)

    }
    const handleClick1=()=>{
        setModalBool(true)
        setModalShow(true)

    }
    const handleLogOut=()=>{
        signOut(auth)
        setIsLogin("")
    }
      console.log("sidebar mount")
    return (
        <div style={{width:"300px"}} className="d-flex flex-column ">
            <div>{auth?.currentUser?.email}</div>
            <Tab.Container activeKey={activeState}>
                <Nav variant="tabs"  onSelect={setActiveState}>
                    <Nav.Item>
                        <Nav.Link eventKey={conversation} >Conversation</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={contacts} >Create Rooms</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className='border-end overflow-auto flex-grow-1'>
                    <Tab.Pane eventKey={conversation}>
                         <Conversations/>  
                    </Tab.Pane>
                    <Tab.Pane eventKey={contacts}>
                    </Tab.Pane>
                </Tab.Content>

            </Tab.Container>
            <div className='border-end border-top small border-2 d-flex flex-column'>
                {!conversationBool && <Button onClick={handleClick1} className=''>{"search conversation"}</Button>}
                {!conversationBool && <Button onClick={handleClick} className=''>{"add conversation"}</Button>}
            </div>
            <button onClick={handleLogOut}>Log out</button>
            <Modal show={modalShow} onHide={handleHide}>
              {modalBool ? <NewConversations close={handleHide}/>:<NewContacts close={handleHide}/>}
            </Modal>

        </div>
    )
}
