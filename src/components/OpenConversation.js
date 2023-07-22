import React, { useState ,useCallback, useEffect } from 'react'
import { useConversation } from '../context/ConversationProvider'
import { Form,Button,InputGroup } from 'react-bootstrap'
import { db } from '../config/firebase'
import { query,where,collection,getDocs,updateDoc
         ,addDoc,doc,onSnapshot, serverTimestamp,orderBy, deleteDoc }                 from 'firebase/firestore'

export default function OpenConversation(props) {
  
  const {refreshState,user}=useConversation()
  console.log(props.id,"this is active id")
  const [selectedConversation,setSelectedConversation]=useState([])
  const dbRefConversation = collection(db, props.id||"1234")
  function getData(){
  onSnapshot(dbRefConversation,(snapshot) => {
    // console.log("inside snapshot")
    const conversationTemp=[]
    snapshot?.docs.forEach((doc)=>{
      conversationTemp.push(doc?.data())
    })
    console.log(conversationTemp, "this is conversation data before sort")
    conversationTemp.sort((a,b)=>a.createdAt-b.createdAt)
    console.log(conversationTemp, "this is conversation data after sort")
    setSelectedConversation(conversationTemp)
  })
}
useEffect(()=>{
  getData()
},[refreshState])
    //bring messages here
    const [text,setText]=useState("")
    const activeId=props.id
    const handleClick=(e)=>{
      console.log(props.id,activeId)
      const messa=text
     e.preventDefault()
     console.log(activeId)
     if (!activeId){
        activeId=1234
     }
     const conversationRef=collection(db,activeId)
     addDoc(conversationRef,{
      message:messa,
      id:user,
      createdAt:Date.now()


    })       
     setText("")
    }
    const handleChange=(e)=>{
        setText(e.target.value)
    }
    const refFUnct=useCallback((node)=>{
        if(node){
            node.scrollIntoView({smooth:true})
        }
    },[])
    const handleDelete=()=>{
      console.log(activeId,"indside handle delete")
      const collectionRef=collection(db,activeId)
       getDocs(collectionRef).then((snapshot)=>{
        snapshot?.docs?.forEach((Doc)=>{
          const docId=Doc?.id
          const docRef=doc(db,props.id,docId)
          deleteDoc(docRef)
        })
      })
      alert("deleted")
    }




  return (
    <div className='border z-0 flex-grow-1 d-flex flex-column '>
      <div className='overflow-auto flex-grow-1'>
        <div className='flex-column justify-content-end aligin-items-start d-flex' style={{'min-height':"100%"}}>
         {selectedConversation?.map((r,index)=>{
            const you=r.id==user
            const last=index==selectedConversation.lenght-1
            return(
            <div className={`d-flex flex-column m-2 align-self-start ${you?'align-self-end':""}`} key={index}>
                <div className={`border rounded-2 p-2 m-1 ${you?"bg-primary ":""}`}>

                {r.message}
                </div>
                <div className='small text-muted align-self-end' ref={refFUnct}>
                    {you?"you":"anonymous "}                
                </div>
            </div>
            )
         })}
         </div>
   
      </div>
      <div>
        <Form onSubmit={(e)=>(handleClick(e))} >
       <InputGroup className="mb-3 z-0">
       <Button onClick={handleDelete} className="z-0" variant="danger" id="button-addon1">
          Delete
        </Button>
        <Form.Control
          required
          value={text}
          onChange={(e)=>(handleChange(e))}
          as="textarea"
          placeholder="type message "
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <Button type="submit" variant="primary" id="button-addon2">
          Send
        </Button>
      </InputGroup>
      </Form>
      </div>
      <div>ROOM SECRET PHRASE : {activeId}</div>
    </div>
  )
}
