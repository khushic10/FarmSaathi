import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Crops from "./Pages/Crops";
import CropRecommendation from "./Pages/CropRecommendation";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import FertilizerRecommendation from "./Pages/FertilizerRecommendation";

export default function Path() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/crops/:page" element={<Crops />} />
				<Route path="/crop/recommendation" element={<CropRecommendation />} />
				<Route
					path="/fertilizer/recommendation"
					element={<FertilizerRecommendation />}
				/>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</div>
	);
}
