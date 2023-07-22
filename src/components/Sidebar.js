import React, { useState } from 'react'
import { Tab, Nav, Button, Modal } from 'react-bootstrap'
import Conversations from './Conversations'
import NewContacts from './NewContacts'
import NewConversations from './NewConversations'
import { useConversation } from '../context/ConversationProvider'
import { GoChevronRight, GoGear, GoX, GoPlus } from "react-icons/go"
import { FaBars } from "react-icons/fa"

export default function Sidebar() {
    const { setIsLogin, user, setUser } = useConversation()
    const conversation = "converse"
    const contacts = "contacts"
    const [activeState, setActiveState] = useState(conversation)
    const [modalShow, setModalShow] = useState(false)
    const conversationBool = activeState == conversation
    const [modalBool, setModalBool] = useState(false)
    const handleHide = () => {
        setModalShow(false)
    }
    const handleClick = () => {
        setModalBool(false)
        setModalShow(true)

    }
    const handleClick1 = () => {
        setModalBool(true)
        setModalShow(true)

    }
    const handleLogOut = () => {

        setUser("")
        setIsLogin("")
    }
    console.log("sidebar mount")
    const [open, setOpen] = useState(true)
    const openSidebar = () => {
        setOpen(r => true)
    }
    const closeSidebar = () => {
        setOpen(r => false)
    }
    return (
<<<<<<< HEAD
        <div style={{ zIndex: "100" }} className={`position-fixed bg-light `}>
            <div style={{ height: "100vh", width: "300px" }} className={`d-flex flex-column   
                                        h-screen z-2 top-0  ${open ? '' : ' d-none '}`}>
                <div className='d-flex justify-content-between'>
                    <div>USER : {user}</div>
                    <button className={` cursor-pointer right-3 border-none  duration-200 ${!open ? "rotate-[405deg] position-absolute d-inline-block top-0" : ""} border-purple-950
      border-0   ${!open && "rotate-180 "} `}
                        onClick={closeSidebar}  >
=======
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
>>>>>>> e6b5f98d36a04dec9254c502593d678b40fafd4d

                        <GoX className='h-100 ' style={{ borderStyle: "none", width: "1.5rem" }} />
                    </button>

                </div>
                <Tab.Container activeKey={activeState}>
                    <Nav variant="tabs" onSelect={setActiveState}>
                        <Nav.Item>
                            <Nav.Link eventKey={conversation} >Conversation</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey={contacts} >Create Rooms</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <div className='border-end border-top small border-2 d-flex flex-column'>
                        {!conversationBool && <Button onClick={handleClick1} className='m-3'>{"search conversation"}</Button>}
                        {!conversationBool && <Button onClick={handleClick} className='m-3'>{"add conversation"}</Button>}
                    </div>
                    <Tab.Content className='border-end overflow-auto flex-grow-1'>
                        <Tab.Pane eventKey={conversation}>
                            <Conversations />
                        </Tab.Pane>
                        <Tab.Pane eventKey={contacts}>
                        </Tab.Pane>
                    </Tab.Content>

                </Tab.Container>
                <Modal show={modalShow} onHide={handleHide}>
                    {modalBool ? <NewConversations close={handleHide} /> : <NewContacts close={handleHide} />}
                </Modal>

            </div>
            <button className={` cursor-pointer right-3 border-none duration-500 m-3 ${!open ? "rotate-[405deg] position-absolute d-inline-block top-0" : "d-none"} border-purple-950
      border-0   ${!open && "rotate-180 "} `}
                onClick={openSidebar}  >
                <FaBars className='h-100 ' style={{ borderStyle: "none", width: "1.5rem" }} />
            </button>
            <button className={`${open ? "fixed-bottom" : "d-none"}`} style={{ width: "300px" }} onClick={handleLogOut}>Log out</button>
        </div>
    )
}
