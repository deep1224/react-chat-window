import React from 'react';
function TextMessage(params) {
	let myClass = params.isMe ? "chat right-chat" : "chat left-chat";
	let length = params.data.text.split(" ").length
	return (
		<div key={`chat${new Date().getTime() * length}`} className={myClass}>
			<div key={`msgBubble${new Date().getTime()}`} className="chat-bubble">
				<div key={`msgInfo${new Date().getTime()}`} className="chat-info">
					<div key={`msgName${new Date().getTime()}`} className="chat-info-name">{params.sender}</div>
					<div key={`msgTime${new Date().getTime()}`} className="chat-info-time">{params.timestamp}</div>
				</div>

				<div key={`msgText${new Date().getTime()}`} className="chat-text">
					{params.data.text}
				</div>
			</div>
			{params.isMe && <>{params.isRead ? <span className="readicon"><i className="fas fa-check"></i> </span>: <span className="notreadicon"><i className="fas fa-check"></i></span>}</>}
		</div>
	)

}

export default TextMessage;