import React, { useEffect } from "react";
import "./Styles/Home.scss";
import Agro from "../Assets/agro.jpg";
import Logo from "../Assets/Time.png";
import Tomato from "../Assets/tomato.jpg";
import Pumpkin from "../Assets/pumpkin.jpg";
import Vegetables from "../Assets/vegetables.jpg";

export default function Home() {
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);
	return (
		<div className="home-main">
			<div className="home-image">
				<img src={Agro} alt="" />
				<div className="home-image-text">
					Growing smarter, farming better with "Farm Saathi".
				</div>
			</div>
			<div className="home-tomato-image">
				<img src={Tomato} alt="" />
			</div>
			<div className="home-pumpkin-image">
				<img src={Pumpkin} alt="" />
			</div>
			<div className="home-about">
				<div className="home-logo-left">
					Welcome to Farm Saathi, your smart farming companion. Discover
					detailed information about various crops and get personalized
					recommendations for crops and fertilizers tailored to your soil and
					climate. Empower your farming with data-driven insights for better
					yields and sustainable practices.
				</div>
				<div className="home-logo">
					<img src={Logo} alt="" />
				</div>
			</div>
			<div className="home-bottom">
				<div className="home-bottom-left">
					Farm Saathi stands beside you, guiding your journey from seed to
					harvest.
					<div className="home-bottom-vegetable">
						<img src={Vegetables} alt="" />
					</div>
				</div>
				<div className="home-bottom-right">
					<div className="home-bottom-text">
						Agriculture is the art of nurturing life from the soil, feeding both
						body and soul. It’s the heartbeat of our communities, where the land
						gives back to those who care for it.
					</div>
					<span className="home-bottom-highlight">
						Cultivate success with Farm Saathi.
					</span>
				</div>
			</div>
		</div>
	);
}
