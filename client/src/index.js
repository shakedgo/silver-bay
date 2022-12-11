import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";

// Import components onlu when needed
const App = lazy(() => import("./App"));
const Navbar = lazy(() => import("./Navigation/Navbar"));
const About = lazy(() => import("./Pages/About"));

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Suspense>
					<Navbar />
					<Routes>
						<Route path="/" element={<App />}></Route>
						<Route path="/about" element={<About />}></Route>
					</Routes>
				</Suspense>
			</BrowserRouter>
			{/* <ReactQueryDevtools /> */}
		</QueryClientProvider>
	</React.StrictMode>
);
