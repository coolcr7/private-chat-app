import { Container, Form, Button } from "react-bootstrap"
import { auth, googleProvider, db } from "../config/firebase";
import { signInWithPopup } from "firebase/auth"
import Cookies from "universal-cookie"
import { query, where, collection, addDoc, getDocs } from 'firebase/firestore'
import { useState } from "react";
import { useConversation } from "../context/ConversationProvider";
const cookies = new Cookies();

export default function Login({ onSignIn }) {
  const [secretKey,setSecretKey]=useState("")
  const {setUser,setIsLogin}=useConversation()
  const handleId = async () => {
    const userName=secretKey
      try {
        const dbRef = collection(db, "users")
        const q = query(dbRef, where("email", "==",userName))
        getDocs(q).then((snapshot) => {
          if (!snapshot.docs.length) {
            addDoc(dbRef, {
              email:userName,
              conversation: []
            }).then(()=>{
              cookies.set("auth-token", "signedIN")
              setUser(secretKey)    
            })
          }else{
          cookies.set("auth-token", "signedIN")
          setIsLogin("signedIN")
          setUser(secretKey)
          }

        }).catch((error) => {
          console.error(error);
        });
      } catch (err) {
        console.log(err, "error saving user")
      }

    

  }
  const handlechange=(e)=>{
    setSecretKey(e.target.value)
  }
  return (
    <div>
      <Container className='d-flex align-items-center' style={{ height: "100vh" }}>
        <div className="m-3">
          <label for="formGroupExampleInput" className="form-label">Type Your Secret Key</label>
          <input onChange={(e)=>handlechange(e)} type="text" className="form-control" id="formGroupExampleInput" placeholder="Secret key "/>
        <Button variant='secondary' className="m-3" onClick={handleId}> SUBMIT</Button>
        </div>
      </Container>


    </div>
  )
}
