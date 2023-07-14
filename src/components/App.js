import Login from "./Login";
import Dashbord from "./Dashbord";
import { useConversation } from "../context/ConversationProvider";



function App() {
  const {isLogin,setIsLogin} =useConversation()


  return (
    <>
      <div className="App">
        {isLogin&&isLogin!="" ? <Dashbord /> : <Login onSignIn={setIsLogin} />}
      </div>
    </>
  );
}

export default App;
