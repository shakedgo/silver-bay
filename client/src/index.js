import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navigation/Navbar";
import About from "./Pages/About";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	// <React.StrictMode>
	<BrowserRouter>
		<Navbar />
		<Routes>
			<Route path="/" element={<App />}></Route>
			<Route path="/about" element={<About />}></Route>
		</Routes>
	</BrowserRouter>
	// </React.StrictMode>
);
