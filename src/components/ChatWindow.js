import React, { useState, useRef, useEffect } from 'react';
import TextMessage from "./TextMessage";
import CardMessage from './CardMessage';
import QuickReply from './QuickReplyMessage';
import '../App.css';
import ChatTheme from './ChatTheme';

function formatDate(date) {
	const h = "0" + date.getHours();
	const m = "0" + date.getMinutes();

	return `${h.slice(-2)}:${m.slice(-2)}`;
}

function ChatWindow(props) {

	const activeSlideRef = useRef();
	const [userMessage, setUserMessage] = useState("");
	const [loadChatWindow, setLoadChatWindow] = useState(false);
	const [messageData, setMessageData] = useState([]);

	useEffect(() => {
		setMessageData(props.messages);
	},[props.messages])

	useEffect(() => {
		if (loadChatWindow)
			activeSlideRef.current.scrollIntoView({ behavior: 'smooth' })
	}, [loadChatWindow, messageData]);

	function handleInputChange(event) {
		if (!event.target.value) return
		setUserMessage(event.target.value)
	}

	function handleButtonClick(event, data, msgIndex) {
		switch (data.action) {
			case "link":
				window.open(data.url, "_blank")
				break;
			case "quickreply":				
				props.handleResponse({
					sender: "You",
					timestamp: formatDate(new Date()),
					type: "text",
					isMe: true,
					data: {
						text: data.response
					},
				})

				break;
			default:
				break
		}
	}

	function handleChatIconClick(event) {
		setLoadChatWindow(true);
	}

	function handleSubmit(event) {
		event.preventDefault();
		// console.log('You clicked submit.');
		const msgText = userMessage;
		if (!msgText) return;

		props.handleResponse({
			sender: "You",
			timestamp: formatDate(new Date()),
			type: "text",
			isMe: true,
			data: {
				text: msgText
			},
		});
		setUserMessage("")
	}

	return (
		<>
		{/* <GlobalStyles /> */}
			{ChatTheme(props.theme)}
			{
				loadChatWindow ? <section className="messenger">
					<header className="messenger-header">
						<div className="messenger-header-title">
						<b>{props.title? props.title : "Text Me"}</b>
						</div>
						<div className="messenger-header-options">
							<span><i className="fas fa-cog"></i></span>
						</div>
					</header>

					<main className="messenger-chat" >
						{
							messageData && messageData.map((_item, index) => {
								if (_item.type === "card")
									return <div key={`message${new Date().getTime()}${index}`}>{CardMessage(_item, handleButtonClick, index)}</div>
								else if (_item.type === "quickreplies") {
									return <div key={`message${new Date().getTime()}${index}`}>{QuickReply(_item, handleButtonClick, index)}</div>
								}
								return <div key={`message${new Date().getTime()}${index}`}>{TextMessage(_item)}</div>
							}
							)
						}
						<div ref={activeSlideRef} />
					</main>

					<form className="messenger-inputarea" onSubmit={handleSubmit}>
						<input type="text" value={userMessage} onChange={handleInputChange} className="messenger-input" placeholder="Enter your message..." />
						<button type="submit" className="messenger-send-btn">Send</button>
					</form>
				</section> :
					<button className="kc_fab_main_btn" onClick={handleChatIconClick}><i className="fas fa-comment-alt chatIcon"></i></button>

			}

		</>
	);
}

export default ChatWindow