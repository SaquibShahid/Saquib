import React , {useState,useCallback, useEffect} from 'react';
import { useSocket } from '../context/socketProvider';
import {useNavigate} from 'react-router-dom';

const LobbyScreen = () =>{
    const [email, setemail] = useState("");
    const [room, setroom] = useState("");

    const socket = useSocket();
    const navigate = useNavigate();

    const handleSubmit = useCallback((e)=>{
        e.preventDefault(); 
        socket.emit('room:join' , {email,room});
    },[email,room,socket]);

    const handleRoomJoin = useCallback((data)=>{
        const {email, room} = data;
        navigate(`/room/${room}`);
    },[navigate])

    useEffect(() => {
      socket.on('room:join',handleRoomJoin);
      return ()=>{
        socket.off('room:join',handleRoomJoin);
      }
    }, [socket,handleRoomJoin]);
    
    return(
        <div>
            <h1>
                Lobby
            </h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email Id : </label>
                <input type="email" id='email' value={email} onChange={(e)=> setemail(e.target.value)}/>
                <br />
                <label htmlFor="room">Room Id : </label>
                <input type="text"  id="room" value={room} onChange={(e)=> setroom(e.target.value)}/>
                <br />
                <button>Join</button>
            </form>
        </div>
    );
};

export default LobbyScreen;
