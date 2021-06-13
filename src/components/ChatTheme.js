import React from 'react';
import { themes } from '../config/themes';
import { createGlobalStyle } from 'styled-components';

function ChatTheme(theme) {
	var style = theme? themes[theme] : themes.blue;	
	const GlobalStyles = createGlobalStyle`
		html ${style}
		` ;
	return (
		<GlobalStyles />
	);
}

export default ChatTheme;