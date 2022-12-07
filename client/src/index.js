// import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import App from "./App";
import Navbar from "./Navigation/Navbar";
import About from "./Pages/About";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	// <React.StrictMode>
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<App />}></Route>
				<Route path="/about" element={<About />}></Route>
			</Routes>
		</BrowserRouter>
		<ReactQueryDevtools />
	</QueryClientProvider>
	// </React.StrictMode>
);
