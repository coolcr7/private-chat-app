import Login from "./Login";
import Dashbord from "./Dashbord";
import { useConversation } from "../context/ConversationProvider";



function App() {
  const {user,setUser} =useConversation()


  return (
    <>
      <div className="App">
        {user&&user!="" ? <Dashbord /> : <Login onSignIn={setUser} />}
      </div>
    </>
  );
}

export default App;
