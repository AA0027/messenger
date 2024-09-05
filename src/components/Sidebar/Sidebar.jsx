import {  Avatar, Badge, Box, Button, ButtonGroup, Modal, TextField, Typography } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import React, { useContext, useEffect, useState } from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContextProvider';
import * as data from '../../apis/data';
import * as convert from '../Body/Convert';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
 };

const Sidebar = (props) => {
    const { inviteF, setInviteF } = props;
    const { userInfo, logout , inviteCard, setInviteCard} = useContext(LoginContext);
    const [newChannel , setNewChannel]= useState("");
    const [open, setOpen] = useState(false);
    const [inviteOpen, setInviteOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const inviteListOpen = () => setInviteOpen(true);
    const inviteListClose = () => setInviteOpen(false);
    const navigate = useNavigate();

     
    const myChannel = () => {
        navigate("/home");
    }

    const createChannel = async () => {
        const info = {
            name: newChannel,
            myId: userInfo.username,
        };

        const result = await data.createChannel(info);
        // 채널 정보 변경 시켜주기 
        const {name, code} = result.data;
        navigate("/chat", {state:{name, code}});
    }

    const acceptInvite = async (x) => {
        const response = await data.accept(x);
        if(response.status === 200){
          resetInvite(x.code);
          setInviteF(!inviteF);
        }
    }
  
    const rejectInvite = async (x) => {
        const response = await data.reject(x);
        if(response.status === 200){
          resetInvite(x.code);
        }
    }
  
    const resetInvite = (code) => {
      setInviteCard(inviteCard.filter(c => c.chatRoom.code !== code));
    }

    
    const change = (e) => {
        setNewChannel(e.target.value);
    }

    return (
        <div className='side-bar'>
            <div className='side-item user-avatar'>
                <Avatar src="/broken-image.jpg" sx={{width: "50%", height: "50%"}}/>
            </div>   
            <Button className='side-item logout' variant="contained" size="small" onClick={logout}>
                    로그아웃
            </Button>

           

            <div className='menu side-item jua-regular' >

                <div className='user-info side-item'> 
                    {userInfo.name + " "}
                    { convert.getPos(userInfo.position) }<br></br>
                    ({convert.getDept(userInfo.dept)})
                    
                </div>
                {inviteCard.length === 0 ? 
                    <MailIcon color="action" fontSize='large' onClick={inviteListOpen}/>
                    :
                    <Badge badgeContent="new" color="primary">
                        <MailIcon color="action" fontSize='large' onClick={inviteListOpen}/>
                    </Badge>
                }
               
            
                <div onClick={myChannel} className='menu-item'>My 채널</div>
                <div  className='menu-item' onClick={handleOpen}>채널 생성</div>
            </div>
            <Modal 
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <div className='modal'>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                        Channel 생성
                        </Typography>
                        <TextField id="outlined-basic" label="채널이름" size='small' value={newChannel} onChange={change}/>
                        <Button variant="contained" size="small" onClick={createChannel} >
                            생성
                        </Button>

                    </div>
                </Box>
            </Modal>

            <Modal 
                open={inviteOpen}
                onClose={inviteListClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        초대장
                    </Typography>
                    {
                        
                        inviteCard && inviteCard.map(i => 
                        <div className='invite-modal' key={i.code}>
                            <div>
                                {(i.chatRoom) && <span className='invite'>{i.chatRoom.name}</span>}
                                {(i.from) && <span className='from'> {i.from.name}</span>}  
                            </div>
                            <div className='invite-btn'>
                                <Button sx={{fontSize: "0.6rem" , minWidth: "10px"}} onClick={() => acceptInvite({code: i.chatRoom.code, username: userInfo.username})}>입장</Button>
                                <Button sx={{fontSize: "0.6rem" , minWidth: "10px", color: "red"}} onClick={() => rejectInvite({code: i.chatRoom.code, username: userInfo.username})}>삭제</Button>
                            </div>
                        </div>)
                        
                    }
                    
                </Box>
            </Modal>
        </div>
    );
};

export default Sidebar;
