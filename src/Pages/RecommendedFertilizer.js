import React from "react";
import { useLocation, useParams } from "react-router-dom";
import fertilizerData from "../Assets/Data/FertilizerRecommend.json"; // Assuming your JSON file is in this directory
import "./Styles/RecommendFertilizer.scss";

export default function RecommendedFertilizer() {
	const location = useLocation();
	const { fertilizerName } = useParams();
	const formData = location.state?.formData;

	// Find the fertilizer data by name
	const fertilizer = fertilizerData.find(
		(item) =>
			item.name.replace(/\s+/g, "").toLowerCase() ===
			fertilizerName.replace(/\s+/g, "").toLowerCase()
	);

	if (!fertilizer) {
		return <div>Fertilizer not found!</div>;
	}

	return (
		<div className="container">
			<div className="top-text">
				The fertilizer recommendation according to the soil, weather and crop
				parameters is {fertilizerName}.
			</div>
			{formData && (
				<table className="styled-table">
					<tr>
						<th>N</th>
						<th>P</th>
						<th>K</th>
						<th>Temperature (C)</th>
						<th>Humidity (%)</th>
						<th>Moisture (%)</th>
						<th>Crop Type</th>
						<th>Soil Type</th>
					</tr>
					<tr>
						<td>{formData.N}</td>
						<td>{formData.P}</td>
						<td>{formData.K}</td>
						<td>{formData.temperature}</td>
						<td>{formData.humidity}</td>
						<td>{formData.moisture}</td>
						<td>{formData.crop_type}</td>
						<td>{formData.soil_type}</td>
					</tr>
				</table>
			)}
			<h1>{fertilizer.name}</h1>
			<div className="fertilizer-top">
				<div className="card-image">
					<img src={fertilizer.image} alt={fertilizer.name} />
				</div>
				<div>
					<div className="card-section">
						<h2 className="card-title">Type:</h2>
						<p>{fertilizer.type}</p>
					</div>
					<div className="card-section">
						<h2 className="card-title">Description:</h2>
						<p>{fertilizer.description}</p>
					</div>
				</div>
			</div>

			<div className="card-section">
				<h2 className="card-title">Composition:</h2>
				<ul>
					<li>
						<span>Nitrogen (N):</span> {fertilizer.composition.N}%
					</li>
					<li>
						<span>Phosphorus (P):</span> {fertilizer.composition.P}%
					</li>
					<li>
						<span>Potassium (K):</span> {fertilizer.composition.K}%
					</li>
				</ul>
			</div>

			<div className="card-section">
				<h2 className="card-title">Application:</h2>
				<ul>
					<li>
						<span>Usage:</span> {fertilizer.application.usage}
					</li>
					<li>
						<span>Method:</span> {fertilizer.application.method}
					</li>
					<li>
						<span>Dosage:</span> {fertilizer.application.dosage}
					</li>
				</ul>
			</div>

			<div className="card-section">
				<h2 className="card-title">Notes:</h2>
				<p>{fertilizer.notes}</p>
			</div>
		</div>
	);
}
