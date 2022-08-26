import React, { useState } from "react";
import BotIcon from "../../assets/chatbot.svg";
import ChatBot from 'react-simple-chatbot';
import Search from "./Search";

function Bot () {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(true);
    const [trigger, setTrigger] = useState(true);
    
    const floatingStyleConfig = {background: "#6e48aa"};
    const bubbleStyleConfig = {fontFamily: "sans-serif"}
    return (
      <div>
        <ChatBot 
          recognitionEnable={true}
          steps={[
            {
                id: '0',
                message: 'Hello! I am your personal stylist from Vinty Luxury Consignment and I\'m here to help! What is one word that describes your aesthetic or look that you\'re going for?',
                trigger: '1',
            },
            {
                id: '1',
                user: true,
                trigger: '2',
            },
            {
              id: '2',
              message: "Searching for your dream items 🤩 Hang tight!",
              trigger: '3',
            },
            {
              id: '3',
              component: <Search />,
              trigger: '4',
            },
            {
              id: '4',
              message: "Would you like me to find more items for you? If so, enter in one word that describes your aesthetic or look that you\'re going for!",
              trigger: '1',
            },
          ]} 
          floating="true"
          floatingStyle={floatingStyleConfig}
          bubbleStyle={bubbleStyleConfig}
          botAvatar={BotIcon}
          botDelay={2000}
        />
      </div>
    );
}

export default Bot;