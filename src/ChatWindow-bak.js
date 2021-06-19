import React, { useState, useRef, useEffect } from 'react';
import TextMessage from "./TextMessage";
import CardMessage from './CardMessage';
import QuickReply from './QuickReplyMessage';
import '../App.css';
import ChatTheme from './ChatTheme';
import PropTypes from 'prop-types'

function formatDate(date) {
	const h = "0" + date.getHours();
	const m = "0" + date.getMinutes();

	return `${h.slice(-2)}:${m.slice(-2)}`;
}

ChatWindow.propTypes = {
	title: PropTypes.string.isRequired,
	theme: PropTypes.string.isRequired,
	messages: PropTypes.array.isRequired,
	handleUserResponse: PropTypes.func.isRequired,
	handleClose: PropTypes.func.isRequired,
	isConnected: PropTypes.bool,
}


function ChatWindow({ title, theme, messages, handleUserResponse, isConnected, handleClose, windowSize }) {

	const activeSlideRef = useRef();
	const [userMessage, setUserMessage] = useState("");
	const [loadChatWindow, setLoadChatWindow] = useState(false);
	const [isChatConnected, setIsChatConnected] = useState(false);
	const [loadMenu, setLoadMenu] = useState(false);
	const [messageData, setMessageData] = useState([]);

	useEffect(() => {
		setMessageData(messages);
	}, [messages])

	useEffect(() => {
		setIsChatConnected(isConnected);
	}, [isConnected])

	useEffect(() => {
		if (loadChatWindow && isChatConnected)
			activeSlideRef.current.scrollIntoView({ behavior: 'smooth' })
	}, [loadChatWindow, isChatConnected, messageData]);

	function handleInputChange(event) {
		if (!event.target.value) return
		setUserMessage(event.target.value)
	}

	function printOrder(params) {
		const printableElements = document.getElementById('printme').innerHTML;
		const orderHtml = '<html><head><title></title></head><body>' + printableElements + '</body></html>'
		const oldPage = document.body.innerHTML;
		document.body.innerHTML = orderHtml;
		window.print();
		document.body.innerHTML = oldPage
	}

	function handleButtonClick(event, data, msgIndex) {
		switch (data.action) {
			case "link":
				window.open(data.url, "_blank")
				break;
			case "quickreply":
				handleUserResponse({
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
		closeMenu();
		setLoadChatWindow(true);
	}

	function handleCloseClick(event) {
		closeMenu();
		setMessageData([]);
		setLoadChatWindow(false);
		setIsChatConnected(false);
	}

	function handleMinizeClick(event) {
		setLoadChatWindow(false);
	}

	function handleMenuClick() {
		setLoadMenu(oldValue => !oldValue);
	}

	function closeMenu() {
		setLoadMenu(false)
	}

	function handleSubmit(event) {
		closeMenu();
		event.preventDefault();
		// console.log('You clicked submit.');
		const msgText = userMessage;
		if (!msgText) return;

		handleUserResponse({
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
			{ChatTheme(theme, windowSize)}
			{
				!loadChatWindow ? <button className="kc_fab_main_btn" onClick={handleChatIconClick}>
					<i className="fas fa-comment-alt chatIcon"></i>
				</button> : !isChatConnected ? <div className="messenger">
					<span className="chatLoader"><i className="fas fa-spinner"></i></span>
				</div> :
					<section className="messenger">
						<header className="messenger-header">
							<div className="messenger-header-title">
								<b>{title ? title : "Text Me"}</b>
							</div>
							<div className="messenger-header-options">
								<span className="messengerMinimize" onClick={handleMinizeClick}>
									<i className="fas fa-window-minimize"></i>
								</span>
								<span>
									<div className="dropdown">
										<button onClick={handleMenuClick} className="dropbtn"><i className="fas fa-cog"></i></button>
										{loadMenu && <div id="myDropdown" className="dropdown-content">
											<button onClick={printOrder}>Print transcript</button>
											<button onClick={handleCloseClick}>Close</button>
										</div>}
									</div>
								</span>
							</div>
						</header>

						<main className="messenger-chat" >
							<div id="printme">
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
							</div>
							<div ref={activeSlideRef} />
						</main>

						<form className="messenger-inputarea" onSubmit={handleSubmit}>
							<input type="text" onFocus={() => closeMenu()} value={userMessage} onChange={handleInputChange} className="messenger-input" placeholder="Enter your message..." />
							<button type="submit" className="messenger-send-btn">Send</button>
						</form>
					</section>
			}

		</>
	);
}

export default ChatWindow