import React, { useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Styles/Recommendation.scss";
import img1 from "../Assets/vegetables.jpeg";
import img2 from "../Assets/tractor.jpeg";
import img3 from "../Assets/sunflower.jpg";
import img6 from "../Assets/land.jpeg";
import img5 from "../Assets/grass.avif";
import img4 from "../Assets/grapes.jpeg";
import img7 from "../Assets/sky.jpeg";
import img8 from "../Assets/orange.webp";
import img10 from "../Assets/berries.webp";
import img9 from "../Assets/cabbage.webp";

export default function Recommendation() {
	const location = useLocation();
	const navigate = useNavigate();
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		if (location.pathname === "/recommendation") {
			navigate("/recommendation/crop", { replace: true });
		}
	}, [location.pathname, navigate]);
	return (
		<div>
			{location.pathname === "/recommendation/crop" ||
			location.pathname === "/recommendation/fertilizer" ||
			location.pathname === "/recommendation" ? (
				<div>
					<div className="recommend-navbar">
						<ul>
							<NavLink to="/recommendation/crop">
								<li>Crop</li>
							</NavLink>
							<NavLink to="/recommendation/fertilizer">
								<li>Fertilizer</li>
							</NavLink>
						</ul>
					</div>
					<div className="image-relative">
						<div className="image-grid">
							<img src={img1} alt="Grid 1" className="grid-item small" />
							<img src={img2} alt="Grid 2" className="grid-item small" />
							<img src={img3} alt="Grid 3" className="grid-item small" />
							<img src={img4} alt="Grid 4" className="grid-item small" />
							<img src={img5} alt="Grid 5" className="grid-item small" />
							<div className="grid-item small"></div>
							<div className="grid-item small"></div>
							<img src={img6} alt="Grid 6" className="grid-item small" />
							<img src={img7} alt="Grid 6" className="grid-item small" />
							<img src={img8} alt="Grid 6" className="grid-item small" />
							<img src={img9} alt="Grid 6" className="grid-item small" />
							<img src={img10} alt="Grid 6" className="grid-item small" />
						</div>
						<div className="recommend-main">
							<Outlet />
						</div>
					</div>
				</div>
			) : (
				<Outlet />
			)}
		</div>
	);
}
