// SignUpForm.js
import React, { useState } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import CustomTextField from "../Components/CustomTextField";
import { useNavigate } from "react-router-dom";
import useFormValidation from "../Hooks/useFormValidation";

const Register = () => {
	const nav = useNavigate();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const [eye, setEye] = useState(false);

	const handleTogglePassword = () => {
		setEye(!eye);
	};

	const initialFormState = {
		email: "",
		password: "",
	};

	const { formData, setErrors, errors, handleChange, validateForm } =
		useFormValidation(initialFormState);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const validationErrors = validateForm(formData);

		if (Object.keys(validationErrors).length === 0) {
			setLoading(true);
			// try {
			// 	const response = await fetch(`${BASE_URL}/api/v1/auth/employee-login`, {
			// 		method: "POST",
			// 		headers: {
			// 			"Content-Type": "application/json",
			// 		},
			// 		body: JSON.stringify(formData),
			// 	});
			// 	if (response.ok) {
			// 		const data = await response.json();
			// 		console.log(data);
			// 		setCookie("userToken", `${data.token}`, {
			// 			path: "/",
			// 			maxAge: data.tokenExpiryTime,
			// 		});
			// 		setCookie("userRole", `${data.role}`, {
			// 			path: "/",
			// 			maxAge: data.tokenExpiryTime,
			// 		});
			// 		setCookie("userId", `${data.userId}`, {
			// 			path: "/",
			// 			maxAge: data.tokenExpiryTime,
			// 		});
			// 		if (data.role === "ROLE_ACCOUNTING") {
			// 			nav("/account/dashboard");
			// 		} else {
			// 			nav("/sales/dashboard");
			// 		}
			// 		setLoading(false);
			// 	} else {
			// 		const error = await response.json();
			// 		console.log(error);
			// 		setError(error.message);
			// 		setLoading(false);
			// 	}
			// } catch (error) {
			// 	console.log("Fetch error:", error.message);
			// }
			nav("/");
			window.location.reload();
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
				overflow: "auto",
			}}
		>
			<Paper
				elevation={3}
				sx={{
					margin: "3rem",
					padding: "2rem",
					width: "100%",
					maxWidth: "450px",
					position: "absolute",
				}}
			>
				<form onSubmit={handleSubmit}>
					<Typography
						variant="h4"
						sx={{ color: "#cead25", textAlign: "center", mb: 2 }}
					>
						Sign Up
					</Typography>
					<CustomTextField
						title="Full Name"
						placeholder="Enter your full name"
						borderColor="#cead25"
					/>
					<CustomTextField
						title="Email"
						placeholder="Enter your email"
						borderColor="#cead25"
						sx={{ mt: 2 }}
					/>
					<CustomTextField
						title="Password"
						placeholder="Enter your password"
						type="password"
						borderColor="#cead25"
						sx={{ mt: 2 }}
					/>
					<Button
						variant="contained"
						fullWidth
						sx={{
							mt: 3,
							bgcolor: "#6e7525",
							color: "#fff",
							"&:hover": { bgcolor: "#425e0f" },
						}}
					>
						Sign Up
					</Button>
				</form>
				<Typography
					variant="body2"
					sx={{
						color: "#cead25",
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
