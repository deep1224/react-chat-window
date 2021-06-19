import React from 'react';
function CardMessage(params, handleButtonClick, msgIndex) {
	return (
		<div key={`scrollard${new Date().getTime()}`} className="scrollcard">
			{
				params.data.map((_item, index) => {
					return (
						<div key={`cardItem${new Date().getTime()}${index}`} className="scrollcardItem">
							
							<div key={`card${new Date().getTime()}`} className="card">
							{_item.title && <p key={`cardTitle${new Date().getTime()}`} className="cardTitle">{_item.title}</p>}
							{_item.subtitle && <p key={`cardSubTitle${new Date().getTime()}`} className="cardSubtitle">{_item.subtitle}</p>}
							{_item.media && <img key={`cardImage${new Date().getTime()}`} src={_item.media.url} alt="Paris" className="cardImage" />}
								<br />
								{_item.buttons && _item.buttons.map((_btn, index) => {
									return <div><button key={`cbtn${new Date().getTime()}${index}`}
										className="cardlinkButton"
										onClick={(event) => {
											handleButtonClick(event, _btn, msgIndex);
										}}>
										{_btn.title}
									</button><br />
									</div>
								})}
							</div>
						</div>
					)

				})
			}
		</div>

	)

}

export default CardMessage