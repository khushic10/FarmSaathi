// SignUpForm.js
import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import CustomTextField from "../Components/CustomTextField";
import { useNavigate } from "react-router-dom";
import useFormValidation from "../Hooks/useFormValidation";
import Agriculture from "../Assets/agriculture.jpeg";
import BASE_URL from "../Config/Config";
import CustomSelect from "../Components/CustomSelect";

const FertilizerRecommendation = () => {
	const nav = useNavigate();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const initialFormState = {
		N: null,
		P: null,
		K: null,
		temperature: null,
		humidity: null,
		moisture: null,
		soil_type: "",
		crop_type: "",
	};

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	const { formData, setErrors, errors, handleChange, validateForm } =
		useFormValidation(initialFormState);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const validationErrors = validateForm(formData);

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
					nav(
						`/recommendation/recommended/fertilizer/${data.recommended_fertilizer}`,
						{
							state: { formData },
						}
					);
					setLoading(false);
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
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "flex-start",
				position: "relative",
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
					{error && (
						<Box
							sx={{
								color: "red",
								fontSize: "1rem",
								textAlign: "center",
							}}
						>
							{error}
						</Box>
					)}
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
							value={formData.N}
							error={errors.N}
							helperText={errors.N}
						/>
						<CustomTextField
							title="Phosphorus (P)"
							name="P"
							placeholder="Enter the phosphorus value"
							borderColor="#cead25"
							type="Number"
							onChange={handleChange}
							value={formData.P}
							error={errors.P}
							helperText={errors.P}
							sx={{ mt: 2 }}
						/>
						<CustomTextField
							title="Potassium (K)"
							name="K"
							placeholder="Enter the potassium value"
							type="Number"
							borderColor="#cead25"
							onChange={handleChange}
							value={formData.K}
							error={errors.K}
							helperText={errors.K}
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
							title="Temperature (°C)"
							name="temperature"
							placeholder="Enter the temperature value"
							borderColor="#cead25"
							type="number"
							onChange={handleChange}
							value={formData.temperature}
							error={errors.temperature}
							helperText={errors.temperature}
						/>
						<CustomTextField
							title="Humidity (%)"
							name="humidity"
							placeholder="Enter the humidity value"
							borderColor="#cead25"
							type="Number"
							onChange={handleChange}
							value={formData.humidity}
							error={errors.humidity}
							helperText={errors.humidity}
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
							title="Moisture (%)"
							name="moisture"
							placeholder="Enter the moisture value"
							borderColor="#cead25"
							type="number"
							value={formData.moisture}
							onChange={handleChange}
							error={errors.moisture}
							helperText={errors.moisture}
						/>
						<CustomSelect
							title="Crop Type"
							name="crop_type"
							value={formData.crop_type}
							onChange={handleChange}
							options={[
								{ value: "Maize", label: "Maize" },
								{ value: "Sugarcane", label: "Sugarcane" },
								{ value: "Cotton", label: "Cotton" },
								{ value: "Tobacco", label: "Tobacco" },
								{ value: "Paddy", label: "Paddy" },
								{ value: "Barley", label: "Barley" },
								{ value: "Wheat", label: "Wheat" },
								{ value: "Millets", label: "Millets" },
								{ value: "Oil seeds", label: "Oil seeds" },
								{ value: "Pulses", label: "Pulses" },
								{ value: "Ground Nuts", label: "Ground Nuts" },
							]}
							placeholder="Enter the type of crop"
							error={errors.crop_type}
							helperText={errors.crop_type}
							label="Crop Type"
							borderColor="#cead25"
						/>
						<CustomSelect
							title="Soil Type"
							name="soil_type"
							placeholder="Enter the type of soil"
							borderColor="#cead25"
							type="Text"
							value={formData.soil_type}
							error={errors.soil_type}
							helperText={errors.soil_type}
							onChange={handleChange}
							sx={{ mt: 2 }}
							options={[
								{ value: "Sandy", label: "Sandy" },
								{ value: "Loamy", label: "Loamy" },
								{ value: "Clayey", label: "Clayey" },
								{ value: "Black", label: "Black" },
								{ value: "Red", label: "Red" },
							]}
							label="Crop Type"
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
						disabled={loading}
					>
						Get Recommendations
					</Button>
				</form>
			</Paper>
		</Box>
	);
};

export default FertilizerRecommendation;
