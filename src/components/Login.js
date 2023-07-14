import {Container,Form,Button} from "react-bootstrap"
import { auth,googleProvider,db } from "../config/firebase";
import {signInWithPopup} from "firebase/auth"
import Cookies from "universal-cookie"
import { query,where,collection,addDoc,getDocs } from 'firebase/firestore'
const cookies=new Cookies();

export default function Login({onSignIn}) {
  const handleId=async ()=>{
    try{
      const result=await signInWithPopup(auth,googleProvider).catch(()=>{alert("something went wrong")});
      console.log(result?.user?.refreshToken)
      cookies.set("auth-token",result.user.refreshToken)
      onSignIn(result?.user?.refreshToken)
      try{
        const dbRef=collection(db,"users")
        const q= query(dbRef,where("email","==",auth.currentUser.email))
        getDocs(q).then((snapshot) => {
          if (!snapshot.docs.length){
            addDoc(dbRef,{
              email:auth.currentUser.email,
              conversation:[]
            })
          }else{
            console.log(q,"found user")
          }
        }).catch((error) => {
          console.error(error);
        });
      }catch(err){
        console.log(err,"error saving user")
      }

    }catch(err){
      console.log(err,"error with google signin")
    }
    
  }
  return (
    <div>
        <Container className='d-flex align-items-center' style={{height:"100vh"}}>
                <Button variant='secondary' onClick={handleId}> Sign IN With GOOGLE</Button>
        </Container>

      
    </div>
  )
}
