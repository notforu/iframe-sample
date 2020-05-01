import React, { useEffect, useState, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
	const [count, setCount] = useState(0);
	const onClick = useCallback(
		() => {
			window.parent.postMessage('asdf', 'http://localhost:8083');
		},
		[]
	);
	useEffect(
		() => {
			const onMessage = (e) => {
				console.log(e);
				setCount(count + 1);
			};
			window.addEventListener('message', onMessage);

			return () => window.removeEventListener('message', onMessage);
		},
		[count]
	);

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<div>Количество кликов из родительской страницы: {count}</div>
				<button style={{ marginTop: 10 }} onClick={onClick}>Постучаться из модуля</button>
			</header>
		</div>
	);
}

export default App;
