import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Crops from "./Pages/Crops";
import CropRecommendation from "./Pages/CropRecommendation";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import FertilizerRecommendation from "./Pages/FertilizerRecommendation";
import PrivateRoute from "./Components/PrivateRoute";
import Recommendation from "./Pages/Recommendation";

export default function Path() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/crops/:page" element={<Crops />} />
				<Route
					path="/recommendation"
					element={
						<PrivateRoute>
							<Recommendation />
						</PrivateRoute>
					}
				>
					<Route
						index
						element={
							<PrivateRoute>
								<CropRecommendation />
							</PrivateRoute>
						}
					/>
					<Route
						path="/recommendation/crop"
						element={
							<PrivateRoute>
								<CropRecommendation />
							</PrivateRoute>
						}
					/>
					<Route
						path="/recommendation/fertilizer"
						element={
							<PrivateRoute>
								<FertilizerRecommendation />
							</PrivateRoute>
						}
					/>
				</Route>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</div>
	);
}
