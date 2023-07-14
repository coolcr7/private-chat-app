import React, { useRef, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { db,auth } from '../config/firebase'
import { query,where,collection,getDocs,updateDoc,doc } from 'firebase/firestore'

export default function NewConversations({ close }) {
  const secretRef = useRef()
  const roomRef = useRef()
  function handleSubmit(e) {
    e.preventDefault()
    const secret=secretRef.current.value
    const roomId=roomRef.current.value
    const conversationRef=collection(db,"converstation")
    const userRef=collection(db,"users")
    const q= query(conversationRef,where("conversationId","==",roomId|| ""))
    getDocs(q).then((snapshot)=>{
      const data=snapshot.docs[0]?.data()
      if (!data){
        close()
        alert("no such room")
        return
      }
      if (data.secret!=secret){
        close()
        alert("wrong secret")
        return 
      }
      if (data.noOfUser>1){
        close()
        alert("room full")
        return
      }else if(data.noOfUser==1){
        const q= query(userRef,where("email","==",auth.currentUser?.email|| ""))
        const docIdCoversation=snapshot.docs[0]?.id
        const docRefConversation=doc(db,"converstation",docIdCoversation)
        getDocs(q).then((snapshot)=>{
          if (!snapshot.docs?.length){
            close()
            alert("no user found")
            return
    
          }
        
          const dataUser=snapshot.docs[0]?.data()
          const docId=snapshot.docs[0]?.id
          const docRef=doc(db,"users",docId)
          const obj={roomId,room:data.roomName}
          updateDoc(docRef,{
              conversation:[...dataUser.conversation,obj]
              
          }).then(()=>{
            updateDoc(docRefConversation,{
              noOfUser:2
          })
          })
        })

      }
      

    })
    
    close()
  }
  return (
    <div>
      <Modal.Header closeButton>
        Search Converstation
      </Modal.Header>
      <Modal.Body>
        <Form >
          <Form.Group>
            <Form.Label for="1" >Secret phrase</Form.Label>
            <Form.Control ref={secretRef} id="1" type='text' />
          </Form.Group>
          <Form.Group>
            <Form.Label for="2" >Room ID</Form.Label>
            <Form.Control ref={roomRef} id="2" type='text' />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}> Submit</Button>
      </Modal.Footer>
    </div>
  )
}
