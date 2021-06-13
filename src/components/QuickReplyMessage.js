import React from 'react';
import TextMessage from "./TextMessage";

function QuickReply(quickMessages, handleButtonClick, msgIndex) {
	// let myClass = params.isMe ? "chat right-chat" : "chat left-chat";
	return (
		<div key={`quickReplyBox${new Date().getTime()}`} className="quickReplyBox">
			{TextMessage(quickMessages)}
			{!quickMessages.isClicked && quickMessages.quickReplies.map((_quickBtn, index) => {
				return <button key={`qucikBtn${new Date().getTime()}${index}`}
					className="quickreplyBtn"
					onClick={(event) => {
						handleButtonClick(event, { ..._quickBtn, ...{ action: "quickreply" } }, msgIndex);
					}}>
					{_quickBtn.title}
				</button>
			})}
		</div>

	)

}

export default QuickReply