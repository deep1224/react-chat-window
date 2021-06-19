import React, { useState, useEffect } from 'react';
import './App.css';
import ChatWindow from './components/ChatWindow'
// import { ChatWindow } from 'react-chat-window-pro'

function App() {
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    setTimeout(function () { setIsConnected(true); }, 5000);
  }, [])
  const [messageData, setMessageData] = useState(sampleData);
  function handleUserMessage(userResponse) {
    // event.preventDefault();
    // console.log('You clicked submit.');
    // const msgText = userMessage;
    // if (!msgText) return;

    appendMessage(userResponse);

    botResponse();
  }

  function handleChatClose() {
    setIsConnected(false);
  }

  function appendMessage(message) {
    // console.log("Message data before", messageData)
    // setMessageData(oldData => [...oldData, message]);
    // console.log("MessageData After", messageData)
    setMessageData(oldData => [...oldData.map((_item) => { return _item.sender !== "Bot" ? { ..._item, ...{ isRead: true } } : _item }), message]);
  }

  function botResponse() {
    const r = random(0, BOT_MSGS.length - 1);
    const msgText = BOT_MSGS[r];
    const delay = msgText.split(" ").length * 100;

    setTimeout(() => {
      appendMessage({
        sender: "Bot",
        timestamp: formatDate(new Date()),
        type: "text",
        isMe: false,
        data: {
          text: msgText
        },
      });
    }, delay);
  }

  return (
    <>
      <ChatWindow
        theme="blue"
        title="Chat help"
        messages={messageData}
        isConnected={isConnected}
        handleUserResponse={handleUserMessage}
        handleClose={handleChatClose}
        windowSize={"large"} />
      <div style={{marginLeft: "auto", marginRight: "auto"}}>
      <h1 >React Chat Window Pro Demo</h1>
      <h4>
        New Features
        <ul>
          <li>Read Receipt</li>
          <li>Stacked Quick Reply</li>
          <li>Chat Window Sizing (small, medium, large)</li>
          <li>IsConnected Loader</li>
        </ul>
      </h4>
      </div>
      
    </>
  );
}

export default App;


function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

// import React, { useState, useRef, useEffect } from 'react';
// import { createGlobalStyle } from 'styled-components';
// import TextMessage from "./TextMessage";
// import CardMessage from './CardMessage';
// import QuickReply from './QuickReplyMessage';
// import { themes } from '../config/themes';
// import '../App.css';
// import ChatTheme from './ChatTheme';

// const style = themes.blue;
// const GlobalStyles = createGlobalStyle`
//   html ${style}
// `;

const BOT_MSGS = [
  "Hi, how are you?",
  "Ohh... I can't understand what you trying to say. Sorry!",
  "I like to play games... But I don't know how to play!",
  "Sorry if my answers are not relevant. :))",
  "I feel sleepy! :("
];

// function formatDate(date) {
// 	const h = "0" + date.getHours();
// 	const m = "0" + date.getMinutes();

// 	return `${h.slice(-2)}:${m.slice(-2)}`;
// }

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// function ChatWindow(props) {

// 	const activeSlideRef = useRef();
// 	const [userMessage, setUserMessage] = useState("");
// 	const [loadChatWindow, setLoadChatWindow] = useState(false);
// 	const [messageData, setMessageData] = useState(props.messages);

// 	useEffect(() => {
// 		if (loadChatWindow)
// 			activeSlideRef.current.scrollIntoView({ behavior: 'smooth' })
// 	}, [loadChatWindow, messageData]);

// 	function handleInputChange(event) {
// 		if (!event.target.value) return
// 		setUserMessage(event.target.value)
// 	}

// 	function handleButtonClick(event, data, msgIndex) {
// 		switch (data.action) {
// 			case "link":
// 				window.open(data.url, "_blank")
// 				break;
// 			case "quickreply":
// 				let btndata = { ...messageData[msgIndex], ...{ isClicked: true } }
// 				console.log("msgIndex", msgIndex)
// 				setMessageData(oldData => [...oldData.map((_item, index) => { return index === msgIndex ? btndata : _item }), {
// 					sender: "You",
// 					timestamp: formatDate(new Date()),
// 					type: "text",
// 					isMe: true,
// 					data: {
// 						text: data.response
// 					},
// 				}]);
// 				console.log("setMessageData", messageData)

// 				break;
// 			default:
// 				break
// 		}
// 	}

// 	function handleChatIconClick(event) {
// 		setLoadChatWindow(true);
// 	}

// 	function handleSubmit(event) {
// 		event.preventDefault();
// 		console.log('You clicked submit.');
// 		const msgText = userMessage;
// 		if (!msgText) return;

// 		appendMessage({
// 			sender: "You",
// 			timestamp: formatDate(new Date()),
// 			type: "text",
// 			isMe: true,
// 			data: {
// 				text: msgText
// 			},
// 		});
// 		setUserMessage("")

// 		botResponse();
// 	}

// 	function appendMessage(message) {
// 		// let data = [...messageData]
// 		// data.push(message)
// 		console.log("Message data before", messageData)
// 		setMessageData(oldData => [...oldData, message]);
// 		console.log("MessageData After", messageData)
// 		// activeSlideRef.current.scroll(0, 500)
// 		// activeSlideRef.current.scrollIntoView({ behavior: 'smooth' })
// 	}

// 	function botResponse() {
// 		const r = random(0, BOT_MSGS.length - 1);
// 		const msgText = BOT_MSGS[r];
// 		const delay = msgText.split(" ").length * 100;

// 		setTimeout(() => {
// 			appendMessage({
// 				sender: "Bot",
// 				timestamp: formatDate(new Date()),
// 				type: "text",
// 				isMe: false,
// 				data: {
// 					text: msgText
// 				},
// 			});
// 		}, delay);
// 	}




// 	return (
// 		<>
// 		{/* <GlobalStyles /> */}
// 			{ChatTheme(props.theme)}
// 			{
// 				loadChatWindow ? <section className="messenger">
// 					<header className="messenger-header">
// 						<div className="messenger-header-title">
// 						<b>{props.title? props.title : "Text Me"}</b>
// 						</div>
// 						<div className="messenger-header-options">
// 							<span><i className="fas fa-cog"></i></span>
// 						</div>
// 					</header>

// 					<main className="messenger-chat" >
// 						{
// 							messageData.map((_item, index) => {
// 								if (_item.type === "card")
// 									return <div key={`message${new Date().getTime()}${index}`}>{CardMessage(_item, handleButtonClick, index)}</div>
// 								else if (_item.type === "quickreplies") {
// 									return <div key={`message${new Date().getTime()}${index}`}>{QuickReply(_item, handleButtonClick, index)}</div>
// 								}
// 								return <div key={`message${new Date().getTime()}${index}`}>{TextMessage(_item)}</div>
// 							}
// 							)
// 						}
// 						<div ref={activeSlideRef} />
// 					</main>

// 					<form className="messenger-inputarea" onSubmit={handleSubmit}>
// 						<input type="text" value={userMessage} onChange={handleInputChange} className="messenger-input" placeholder="Enter your message..." />
// 						<button type="submit" className="messenger-send-btn">Send</button>
// 					</form>
// 				</section> :
// 					<button className="kc_fab_main_btn" onClick={handleChatIconClick}><i className="fas fa-comment-alt chatIcon"></i></button>

// 			}

// 		</>
// 	);
// }

// // export default ChatWindow
const sampleData = [{
  sender: "Bot",
  timestamp: formatDate(new Date()),
  type: "text",
  isMe: false,
  data: {
    text: "Hi, welcome to chat window pro"
  },
},
{
  sender: "You",
  timestamp: formatDate(new Date()),
  type: "text",
  isMe: true,
  isRead: true,
  data: {
    text: "I need help"
  },
},
// {
//   sender: "Bot",
//   timestamp: formatDate(new Date()),
//   type: "card",
//   isMe: false,
//   data: [{
//     title: "Smart TVs",
//     subtitle: "Best selling smart TVs",
//     media: {
//       type: "image",
//       url: "https://cdn.iconscout.com/icon/free/png-256/tv-television-remote-hotel-restaurant-room-entertainment-6-22850.png",
//     },
//   },{
//     title: "Smart TVs",
//     subtitle: "Best selling smart TVs",
//     media: {
//       type: "image",
//       url: "https://cdn.iconscout.com/icon/free/png-256/tv-television-remote-hotel-restaurant-room-entertainment-6-22850.png",
//     },
//   },]
// },
// {
//   sender: "Bot",
//   timestamp: formatDate(new Date()),
//   type: "card",
//   isMe: false,
//   data: [{
//     // title: "Smart TVs",
//     subtitle: "Best selling smart TVs Best selling smart TVs",
//     buttons: [
//       {
//         action: "link",
//         title: "Buy",
//         url: "https://www.google.com/",
//         tooltip: "Buy this product with 20% discount"
//       },
//       {
//         action: "link",
//         title: "Add to Cart",
//         url: "https://www.google.com/",
//         tooltip: "Buy this product with 20% discount"
//       }
//     ]
//   },]
// },
// {
//   sender: "Bot",
//   timestamp: formatDate(new Date()),
//   type: "card",
//   isMe: false,
//   data: [{
//     // title: "Smart TVs",
//     subtitle: "Best selling smart TVs Best selling smart TVs",
//     buttons: [
//       {
//         action: "quickreply",
//         title: "Buy",
//         response: "Buy"
//       },
//       {
//         action: "quickreply",
//         title: "Add to Cart",
//         response: "Add to cart"
//       }
//     ]
//   },]
// },
// {
//   sender: "Bot",
//   timestamp: formatDate(new Date()),
//   type: "card",
//   isMe: false,
//   data: [{
//     title: "Smart TVs",
//     subtitle: "Best selling smart TVs",
//     media: {
//       type: "image",
//       url: "https://cdn.iconscout.com/icon/free/png-256/tv-television-remote-hotel-restaurant-room-entertainment-6-22850.png",
//     },
//     buttons: [
//       {
//         action: "link",
//         title: "Buy",
//         url: "https://www.google.com/",
//         tooltip: "Buy this product with 20% discount"
//       },
//       {
//         action: "link",
//         title: "Add to Cart",
//         url: "https://www.google.com/",
//         tooltip: "Buy this product with 20% discount"
//       },
//       {
//         action: "link",
//         title: "Wishlist",
//         url: "https://www.google.com/",
//         tooltip: "Buy this product with 20% discount"
//       },
//       {
//         action: "link",
//         title: "Go to Cart",
//         url: "https://www.google.com/",
//         tooltip: "Buy this product with 20% discount"
//       },
//     ]
//   }, {
//     title: "I am title",
//     subtitle: "I am Subtitle",
//     media: {
//       type: "image",
//       url: "https://cdn.iconscout.com/icon/free/png-256/tv-television-remote-hotel-restaurant-room-entertainment-6-22850.png",
//     },
//     buttons: [
//       {
//         action: "link",
//         title: "Buy",
//         tooltip: "Buy this product with 20% discount"
//       },
//       {
//         action: "link",
//         title: "Add to Cart",
//         tooltip: "Buy this product with 20% discount"
//       },
//       {
//         action: "link",
//         title: "Wishlist",
//         tooltip: "Buy this product with 20% discount"
//       },
//       {
//         action: "link",
//         title: "Go to Cart",
//         tooltip: "Buy this product with 20% discount"
//       },
//     ]
//   }, {
//     title: "I am title",
//     subtitle: "I am Subtitle",
//     media: {
//       type: "image",
//       url: "https://image.flaticon.com/icons/svg/145/145867.svg",
//     },
//     buttons: [
//       {
//         action: "link",
//         title: "Buy",
//         tooltip: "Buy this product with 20% discount"
//       },
//       {
//         action: "link",
//         title: "Add to Cart",
//         tooltip: "Buy this product with 20% discount"
//       },
//       {
//         action: "link",
//         title: "Wishlist",
//         tooltip: "Buy this product with 20% discount"
//       },
//       {
//         action: "link",
//         title: "Go to Cart",
//         tooltip: "Buy this product with 20% discount"
//       },
//     ]
//   },
//   ],
// },
{
  sender: "Bot",
  timestamp: formatDate(new Date()),
  type: "quickreplies",
  isMe: false,
  data: {
    text: "Sure, I can help you with below list."
  },
  isClicked: false,
  quickReplies: [
    {
      title: 'Buy',
      response: 'buy'
    },
    {
      title: 'Sell',
      response: 'Sell'
    },
    {
      title: 'Quick Reply',
      response: 'I am quick reply'
    },
    {
      title: 'Add to cart',
      response: 'add to cart'
    },
    {
      title: 'go to cart',
      response: 'go to cart'
    },
  ]
}

];