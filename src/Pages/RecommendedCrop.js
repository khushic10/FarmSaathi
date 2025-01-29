import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import cropData from "../Assets/Data/RecommendCrops.json"; // Assuming your JSON file is in the same directory
import "./Styles/RecommendCrop.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function RecommendedCrop() {
	const location = useLocation();
	const { cropName } = useParams();
	const formData = location.state?.formData;
	const nav = useNavigate();

	// Find the crop data by name
	const crop = cropData.crops.find(
		(crop) =>
			crop.name.replace(/\s+/g, "").toLowerCase() ===
			cropName.replace(/\s+/g, "").toLowerCase()
	);

	if (!crop) {
		return <div>Crop not found!</div>;
	}
	const handleBack = () => {
		nav(-1);
	};

	return (
		<div className="container">
			<div className="back-button" onClick={() => handleBack()}>
				<ArrowBackIcon />
			</div>
			<div className="top-text">
				The crop recommendation according to the soil and weather parameters is{" "}
				{cropName}.
			</div>
			{formData && (
				<table className="styled-table">
					<tr>
						<th>N</th>
						<th>P</th>
						<th>K</th>
						<th>Temperature</th>
						<th>Humidity</th>
						<th>Rainfall</th>
						<th>pH</th>
					</tr>
					<tr>
						<td>{formData.N}</td>
						<td>{formData.P}</td>
						<td>{formData.K}</td>
						<td>{formData.temperature}</td>
						<td>{formData.humidity}</td>
						<td>{formData.rainfall}</td>
						<td>{formData.ph}</td>
					</tr>
				</table>
			)}
			<h1>
				{crop.name} ({crop.scientificName})
			</h1>
			<div className="crop-top">
				<div className="card-image">
					<img src={crop.crop_image} alt={crop.name} />
				</div>
				<div>
					<div className="card-section">
						<h2 className="card-title">Ideal Sowing Time:</h2>
						<p>{crop.idealSowingTime}</p>
					</div>
					<div className="card-section">
						<h2 className="card-title">Climate Requirements:</h2>
						<div className="card-content">
							<ul>
								<li>
									<span>Temperature:</span>{" "}
									{crop.climateRequirements.temperature}
								</li>
								<li>
									<span>Rainfall:</span> {crop.climateRequirements.rainfall}
								</li>
								<li>
									<span>Humidity:</span> {crop.climateRequirements.humidity}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<div className="card-section">
				<h2 className="card-title">Soil Requirements:</h2>
				<div className="card-content">
					<ul>
						<li>
							<span>Soil Type:</span> {crop.soilRequirements.type}
						</li>
						<li>
							<span>pH:</span> {crop.soilRequirements.pH}
						</li>
					</ul>
				</div>
			</div>
			<div className="crop-top">
				<div>
					<div className="card-section">
						<h2 className="card-title">Watering Needs:</h2>
						<p>{crop.wateringNeeds}</p>
					</div>

					<div className="card-section">
						<h2 className="card-title">Estimated Yield:</h2>
						<p>{crop.estimatedYield}</p>
					</div>

					<div className="card-section">
						<h2 className="card-title">Fertilizer Recommendations:</h2>
						<p>{crop.fertilizerRecommendations}</p>
					</div>
				</div>
				<div className="card-image">
					<img src={crop.image_url} alt={crop.name} />
				</div>
			</div>

			<div className="card-section">
				<h2 className="card-title">Pest and Disease Management:</h2>
				<div className="card-content">
					<ul>
						<li>
							<span>Common Pests:</span>{" "}
							{crop.pestAndDiseaseManagement.commonPests.join(", ")}
						</li>
						<li>
							<span>Diseases:</span>{" "}
							{crop.pestAndDiseaseManagement.diseases.join(", ")}
						</li>
						<li>
							<span>Control Measures:</span>{" "}
							{crop.pestAndDiseaseManagement.controlMeasures.join(", ")}
						</li>
					</ul>
				</div>
			</div>
			<div className="crop-top">
				<div className="card-section">
					<h2 className="card-title">Market Information:</h2>
					<div className="card-content">
						<ul>
							<li>
								<span>Current Market Value:</span>{" "}
								{crop.marketInformation.currentMarketValue}
							</li>
							<li>
								<span>Demand Analysis:</span>{" "}
								{crop.marketInformation.demandAnalysis}
							</li>
						</ul>
					</div>
				</div>

				<div className="card-section">
					<h2 className="card-title">Additional Information:</h2>
					<div className="card-content">
						<ul>
							<li>
								<span>Companion Crops:</span>{" "}
								{crop.additionalInfo.companionCrops.join(", ")}
							</li>
							<li>
								<span>Crop Rotation Suggestions:</span>{" "}
								{crop.additionalInfo.cropRotationSuggestions.join(", ")}
							</li>
							<li>
								<span>Environmental Benefits:</span>{" "}
								{crop.additionalInfo.environmentalBenefits}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
