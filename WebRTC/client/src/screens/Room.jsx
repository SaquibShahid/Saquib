import React, { useCallback ,useEffect , useState} from "react";
import { useSocket } from "../context/socketProvider";
import ReactPlayer from "react-player";

const RoomPage = () => {
    const [remoteSocketId, setremoteSocketId] = useState("");
    const [myStream, setmyStream] = useState()
    const socket = useSocket();
    const handleUserJoin = useCallback(({email,id})=>{
        setremoteSocketId(id);
        console.log(email,id);
    },[])
    const handleUserStream = useCallback(async ()=>{
        const stream =  await navigator.mediaDevices.getUserMedia({
            audio : true,
            video : true
        });
        setmyStream(stream);
    })
    useEffect(() => {
      socket.on("user:joined",handleUserJoin);
      return () =>{
        socket.off("user:joined" , handleUserJoin);
      }
    }, [socket , handleUserJoin])
    
    return(
        <div>
            <h1>
                Room Page
            </h1>
            <h4>{remoteSocketId ? "connected" : "No one in room"}</h4>
            <button onClick={handleUserStream}>Call</button>
            <h2>My Stream</h2>
            {
                myStream && <ReactPlayer playing muted height="100px" width="200px" url={myStream}/>
            }
        </div>
    )
}

export default RoomPage;