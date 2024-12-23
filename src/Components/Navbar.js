import React, { useEffect, useRef, useState } from "react";
import "./Styles/Navbar.scss";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../Assets/Time.png";
import User from "../Assets/user.png";
import { useCookies } from "react-cookie";

export default function Navbar() {
	const nav = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef(null);
	const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);
	const [token, setToken] = useState(cookies.userToken || "");

	useEffect(() => {
		const handler = (e) => {
			if (!menuRef.current.contains(e.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => {
			document.removeEventListener("mousedown", handler);
		};
	}, []);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleLogout = () => {
		removeCookie("userToken", { path: "/" });
		setToken("");
		nav("/");
	};

	return (
		<div className="navbar-main">
			<div>
				<img
					src={Logo}
					alt=""
					height={60}
					width={60}
					style={{ borderRadius: "50%", padding: "0.2rem", margin: "0.4rem" }}
				/>
			</div>
			<ul>
				<NavLink to="/">
					<li>Home</li>
				</NavLink>
				<NavLink to="/crops/1">
					<li>Crops Overview</li>
				</NavLink>
				<NavLink to="/crop/recommendation">
					<li>Crop Recommendation</li>
				</NavLink>
				<NavLink to="/fertilizer/recommendation">
					<li>Fertilizer Recommendation</li>
				</NavLink>
			</ul>
			<div className="navbar-login-main">
				{!token ? (
					<NavLink to="/login">
						<div className="navbar-login">Sign In</div>
					</NavLink>
				) : (
					<div className="userWrapper">
						<img
							src={User}
							alt=""
							onClick={toggleDropdown}
							height={40}
							width={40}
						/>
					</div>
				)}

				<div ref={menuRef}>
					{isOpen && (
						<div className="profile-dropdown">
							Logout ?
							<div className="dropdown-content" onClick={toggleDropdown}>
								<div className="logout_no">No</div>
								<div className="logout_yes" onClick={handleLogout}>
									Yes
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
