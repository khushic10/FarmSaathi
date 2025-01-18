// SignUpForm.js
import React, { useState } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import CustomTextField from "../Components/CustomTextField";
import { useNavigate } from "react-router-dom";
import useFormValidation from "../Hooks/useFormValidation";
import Agriculture from "../Assets/agriculture.jpeg";
import BASE_URL from "../Config/Config";

const FertilizerRecommendation = () => {
	const nav = useNavigate();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const [eye, setEye] = useState(false);

	const handleTogglePassword = () => {
		setEye(!eye);
	};

	const initialFormState = {
		N: "",
		P: "",
		K: "",
		temperature: "",
		humidity: "",
		moisture: "",
		soil_type: "",
		crop_type: "",
	};

	const { formData, setErrors, errors, handleChange, validateForm } =
		useFormValidation(initialFormState);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const validationErrors = validateForm(formData);
		console.log(formData);

		if (Object.keys(validationErrors).length === 0) {
			setLoading(true);
			try {
				const response = await fetch(`${BASE_URL}/predict_fertilizer`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				});
				if (response.ok) {
					const data = await response.json();
					console.log(data);
				} else {
					const error = await response.json();
					console.log(error);
					setError(error.message);
					setLoading(false);
				}
			} catch (error) {
				console.log("Fetch error:", error.message);
			}
		} else {
			setErrors(validationErrors);
		}
	};
	const onSwitch = () => {
		nav("/login");
	};
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "flex-start",
				minHeight: "80vh",
				position: "relative",
				overflow: "auto",
			}}
		>
			<Paper
				elevation={3}
				sx={{
					padding: "2rem",
					width: "100%",
					maxWidth: "650px",
					position: "absolute",
				}}
			>
				<form onSubmit={handleSubmit}>
					<Typography
						variant="h4"
						sx={{ color: "#cead25", textAlign: "center", mb: 2 }}
					>
						Fertilizer Recommendation
					</Typography>
					<Box
						sx={{
							display: "grid",
							gridTemplateColumns: "1fr 1fr 1fr",
							gap: "0.8rem",
						}}
					>
						<CustomTextField
							title="Nitrogen (N)"
							name="N"
							placeholder="Enter the nitrogen value"
							borderColor="#cead25"
							type="number"
							onChange={handleChange}
							value={formData.nitrogen}
						/>
						<CustomTextField
							title="Phosphorus (P)"
							name="P"
							placeholder="Enter the phosphorus value"
							borderColor="#cead25"
							type="Number"
							onChange={handleChange}
							value={formData.phosphorus}
							sx={{ mt: 2 }}
						/>
						<CustomTextField
							title="Potassium (K)"
							name="K"
							placeholder="Enter the potassium value"
							type="Number"
							borderColor="#cead25"
							onChange={handleChange}
							value={formData.potassium}
							sx={{ mt: 2 }}
						/>
					</Box>
					<Box
						sx={{
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
							gap: "0.8rem",
						}}
					>
						<CustomTextField
							title="Temperature"
							name="temperature"
							placeholder="Enter the temperature value"
							borderColor="#cead25"
							type="number"
							onChange={handleChange}
							value={formData.temperature}
						/>
						<CustomTextField
							title="Humidity"
							name="humidity"
							placeholder="Enter the humidity value"
							borderColor="#cead25"
							type="Number"
							onChange={handleChange}
							value={formData.humidity}
							sx={{ mt: 2 }}
						/>
					</Box>
					<Box
						sx={{
							display: "grid",
							gridTemplateColumns: "1fr 1fr 1fr",
							gap: "0.8rem",
						}}
					>
						<CustomTextField
							title="Moisture"
							name="moisture"
							placeholder="Enter the moisture value"
							borderColor="#cead25"
							type="number"
							value={formData.moisture}
							onChange={handleChange}
						/>
						<CustomTextField
							title="Crop Type"
							name="crop_type"
							placeholder="Enter the type of crop"
							borderColor="#cead25"
							type="Text"
							value={formData.crop_type}
							onChange={handleChange}
						/>
						<CustomTextField
							title="Soil Type"
							name="soil_type"
							placeholder="Enter the type of soil"
							borderColor="#cead25"
							type="Text"
							value={formData.soil_type}
							onChange={handleChange}
							sx={{ mt: 2 }}
						/>
					</Box>
					<Button
						variant="contained"
						fullWidth
						type="submit"
						sx={{
							mt: 3,
							bgcolor: "#6e7525",
							color: "#fff",
							"&:hover": { bgcolor: "#425e0f" },
						}}
					>
						Get Recommendations
					</Button>
				</form>
			</Paper>
		</Box>
	);
};

export default FertilizerRecommendation;
