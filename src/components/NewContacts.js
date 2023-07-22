import React, { useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import generateRandomString from '../utils/randomId'
import { db } from '../config/firebase'
import { query,where,collection,getDocs,updateDoc,addDoc,doc } from 'firebase/firestore'
import { useConversation } from '../context/ConversationProvider'

export default function NewContacts({ close }) {
    const {user}=useConversation()
    const idRef=useRef()
    const nameRef=useRef()

    function handleSubmit(e) {
        e.preventDefault()
        const secret=idRef.current.value
        const roomName=nameRef.current.value
        const uniqueId=generateRandomString()
        const conversationRef=collection(db,"converstation")
        const userRef=collection(db,"users")
        const unique_user_query=query(conversationRef,where("secret","==",secret))
        getDocs(unique_user_query).then((snapshot)=>{
            if (snapshot.docs?.length==0){
                addDoc(conversationRef,{
                    roomName:roomName,
                    secret:secret,
                    noOfUser:1
                  }).then(()=>{
                    const q= query(userRef,where("email","==",user|| ""))
                    getDocs(q).then((snapshot)=>{
                        if (!snapshot.docs?.length){
                            throw new Error('no user found');
                        }
                        const data=snapshot.docs[0]?.data()
                        const docId=snapshot.docs[0]?.id
                        const docRef=doc(db,"users",docId)
                        const obj={roomId:secret,room:roomName}
                        updateDoc(docRef,{
                            conversation:[...data.conversation,obj]
                            
                        }).then(()=>{
                            alert("success")
        
                        })
        
                    })
                  }).catch(err=>{
                    alert("creating conversation failed")
                    console.log(err)
                  })

            }else{
                alert("That secret key is alredy in use")
            }
        })

        close()
    }
    return (
        <div>
            <Modal.Header closeButton>
                New Contact
            </Modal.Header>
            <Modal.Body>
                <Form >
                    <Form.Group>
                        <Form.Label for="1" >Secret phrase</Form.Label>
                        <Form.Control ref={idRef} id="1" type='text' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label for="2" >Room Name</Form.Label>
                        <Form.Control ref={nameRef} id="2" type='text' />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit}> Submit</Button>
            </Modal.Footer>

        </div>
    )
}
