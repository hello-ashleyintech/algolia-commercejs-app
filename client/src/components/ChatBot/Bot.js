import React, { useState } from "react";
import BotIcon from "../../assets/chatbot.svg";
import ChatBot from 'react-simple-chatbot';
import Search from "./Search";

function Bot () {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(true);
    const [trigger, setTrigger] = useState(true);

    const steps = [
        {
            id: '0',
            message: 'Hello! I am your personal stylist from Vinty Luxury Consignment and I\'m here to help! What kind of item are you looking for?',
            trigger: '1',
        },
        {
            id: '1',
            user: true,
        },
        {
          id: '2',
          component: <Search />,
        }
    ];
    
    const floatingStyleConfig = {background: "#6e48aa"};
    const bubbleStyleConfig = {fontFamily: "sans-serif"}
    return (
      <div>
        <ChatBot 
          steps={steps} 
          floating="true"
          floatingStyle={floatingStyleConfig}
          bubbleStyle={bubbleStyleConfig}
          botAvatar={BotIcon}
        />
      </div>
    );
}

export default Bot;