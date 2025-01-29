// SignUpForm.js
import React, { useState } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import CustomTextField from "../Components/CustomTextField";
import { useNavigate } from "react-router-dom";
import useFormValidation from "../Hooks/useFormValidation";
import Agriculture from "../Assets/agriculture.jpeg";
import BACKEND_URL from "../Config/Configure";

const Register = () => {
	const nav = useNavigate();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const [eye, setEye] = useState(true);
	const [confirmEye, setConfirmEye] = useState(true);

	const handleTogglePassword = () => {
		setEye(!eye);
	};
	const handleConfirmTogglePassword = () => {
		setConfirmEye(!confirmEye);
	};

	const initialFormState = {
		username: "",
		email: "",
		password: "",
		password2: "",
	};

	const { formData, setErrors, errors, handleChange, validateForm } =
		useFormValidation(initialFormState);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const validationErrors = validateForm(formData);
		console.log(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			setLoading(true);
			try {
				const response = await fetch(`${BACKEND_URL}/api/register/`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				});
				if (response.ok) {
					const data = await response.json();
					nav("/login", { state: { message: data.message } });
					setLoading(false);
				} else {
					const error = await response.json();
					if (error.email) {
						setErrors((prevErrors) => ({
							...prevErrors,
							email: error.email[0],
						}));
					} else {
						setError(error.message); // Set general error message
					}
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
				minHeight: "85vh",
				position: "relative",
			}}
		>
			<img
				src={Agriculture}
				alt=""
				style={{
					minHeight: "88vh",
					width: "100%",
					objectFit: "cover",
					opacity: "90%",
					overflow: "auto",
				}}
			/>
			<Paper
				elevation={3}
				sx={{
					margin: "2rem",
					padding: "2rem",
					width: "100%",
					maxWidth: "450px",
					position: "absolute",
				}}
			>
				<form onSubmit={handleSubmit}>
					<Typography
						variant="h4"
						sx={{ color: "#0098b2", textAlign: "center", mb: 2 }}
					>
						Sign Up
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
					<CustomTextField
						title="UserName"
						placeholder="Enter your full name"
						borderColor="#0098b2"
						name="username"
						value={formData.username}
						error={errors.username}
						helperText={errors.username}
						onChange={handleChange}
					/>
					<CustomTextField
						title="Email"
						placeholder="Enter your email"
						borderColor="#0098b2"
						name="email"
						value={formData.email}
						error={errors.email}
						helperText={errors.email}
						onChange={handleChange}
						sx={{ mt: 2 }}
					/>
					<CustomTextField
						title="Password"
						placeholder="Enter your password"
						type={eye ? "password" : "text"}
						borderColor="#0098b2"
						name="password"
						value={formData.password}
						error={errors.password}
						helperText={errors.password}
						onChange={handleChange}
						eye={eye}
						onEye={handleTogglePassword}
						sx={{ mt: 2 }}
					/>
					<CustomTextField
						title="Confirm Password"
						placeholder="Enter your confirm password"
						type={confirmEye ? "password" : "text"}
						borderColor="#0098b2"
						name="password2"
						value={formData.password2}
						error={errors.password2}
						helperText={errors.password2}
						onChange={handleChange}
						eye={confirmEye}
						onEye={handleConfirmTogglePassword}
						sx={{ mt: 2 }}
					/>
					<Button
						variant="contained"
						fullWidth
						sx={{
							mt: 3,
							bgcolor: "#0098b2",
							color: "#fff",
							"&:hover": { bgcolor: "#425e0f" },
						}}
						type="submit"
						disabled={loading}
					>
						Sign Up
					</Button>
				</form>
				<Typography
					variant="body2"
					sx={{
						color: "#0098b2",
						textAlign: "center",
						mt: 2,
						cursor: "pointer",
					}}
					onClick={onSwitch}
				>
					Already have an account? Login
				</Typography>
			</Paper>
		</Box>
	);
};

export default Register;
