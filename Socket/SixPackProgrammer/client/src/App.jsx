import React, { useEffect , useState , useMemo } from 'react'
import {io} from "socket.io-client"

const App = () => {
  const socket = useMemo(() => io("http://localhost:3000"), []);

  const [message, setmessage] = useState("");

  const handleSubmit = (e) =>{
    e.preventDefault();
    socket.emit("message", message);
  }

  useEffect(() => {

    socket.on("receive-message", (message)=>{
      console.log(message);
    });

    return ()=>{
      socket.disconnect();
    };

  }, [])
  
  return (
    <div>
      <form onSubmit={handleSubmit} type="submit">
        <input type="text" value={message} onChange={e=>setmessage(e.target.value)} /><button>send</button>
      </form>
    </div>
  )
}

export default App