// SignUpForm.js
import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import CustomTextField from "../Components/CustomTextField";
import { useNavigate } from "react-router-dom";
import useFormValidation from "../Hooks/useFormValidation";
import BASE_URL from "../Config/Config";
import Agriculture from "../Assets/agriculture.jpeg";
import { useCookies } from "react-cookie";

const CropRecommendation = () => {
	const nav = useNavigate();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const initialFormState = {
		N: null,
		P: null,
		K: null,
		temperature: null,
		humidity: null,
		rainfall: null,
		ph: null,
	};

	const { formData, setErrors, errors, handleChange, validateForm } =
		useFormValidation(initialFormState);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const validationErrors = validateForm(formData);

		if (Object.keys(validationErrors).length === 0) {
			setLoading(true);
			try {
				const response = await fetch(`${BASE_URL}/predict_crop`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				});
				if (response.ok) {
					const data = await response.json();
					nav(`/recommendation/recommended/crop/${data.recommended_crop}`, {
						state: { formData },
					});
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
						Crop Recommendation
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
							gridTemplateColumns: "1fr 1fr",
							gap: "0.8rem",
						}}
					>
						<CustomTextField
							title="Potential of Hydrogen (pH)"
							name="ph"
							placeholder="Enter the pH value"
							borderColor="#cead25"
							onChange={handleChange}
							value={formData.ph}
							error={errors.ph}
							helperText={errors.ph}
							type="number"
						/>
						<CustomTextField
							title="Rainfall (mm)"
							name="rainfall"
							placeholder="Enter the rainfall value"
							borderColor="#cead25"
							type="Number"
							onChange={handleChange}
							value={formData.rainfall}
							error={errors.rainfall}
							helperText={errors.rainfall}
							sx={{ mt: 2 }}
						/>
					</Box>
					<Button
						variant="contained"
						fullWidth
						sx={{
							mt: 3,
							bgcolor: "#6e7525",
							color: "#fff",
							fontSize: "1.1rem",
							fontWeight: 500,
							"&:hover": { bgcolor: "#425e0f" },
						}}
						type="submit"
					>
						Get Recommendations
					</Button>
				</form>
			</Paper>
		</Box>
	);
};

export default CropRecommendation;
