import React from "react";
import Navbar from "./Components/Navbar";
import { Outlet, useLocation } from "react-router-dom";

export default function Layout() {
	const location = useLocation();
	const currentPath = location.pathname;
	return (
		<div>
			{/* {currentPath !== "/register" ? <Navbar /> : null} */}
			<Navbar />
			<div className="Layout-submain">
				<Outlet />
			</div>
		</div>
	);
}
