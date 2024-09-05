import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Sidebar from '../components/Sidebar/Sidebar';
import { LoginContext } from '../contexts/LoginContextProvider';
import Channel from '../components/Channel/Channel';
import * as data from '../apis/data';
import { HOST } from '../apis/api';
import { Stomp } from '@stomp/stompjs';
const Home = () => {
    const [ channelList, setChannelList ] = useState([]);
    const [ inviteF, setInviteF ] = useState(true);
    const { userInfo, isLogin, inviteCard, getInvite } = useContext(LoginContext);
    useEffect(  ()=>{
        getChannelList();
        
        getInvite({code: "", username: userInfo.username});
    }, [inviteF]);
  

    const getChannelList = async () => {
        const response = await data.channelList(userInfo.username);
        setChannelList([...(response.data)]);
    }

    return (
        <>
            {
                isLogin &&
                <div className="container">
                    <Sidebar inviteF={inviteF} setInviteF={setInviteF}/>
                    <div className=' content jua-regular'>
                        <div className='head'>My Channel</div>
                        <div className='channel-list'>
                            {channelList && channelList.map(e => (<Channel key={e.id} name={e.name} code={e.code} channelList={channelList} setChannelList={setChannelList}/>)) }
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Home;