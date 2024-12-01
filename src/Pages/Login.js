// LoginForm.js
import React, { useState } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import CustomTextField from "../Components/CustomTextField";
import { useNavigate } from "react-router-dom";
import Agriculture from "../Assets/agriculture.jpeg";
import { useCookies } from "react-cookie";
import useFormValidation from "../Hooks/useFormValidation";

const Login = () => {
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

	const [cookies, setCookie] = useCookies(["userToken", "userRole", "userId"]);

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
			setCookie("userToken", "sampletokenfdshfioj", {
				path: "/",
			});
			nav("/");
			window.location.reload();
			setLoading(false);
		} else {
			setErrors(validationErrors);
		}
	};
	const onSwitch = () => {
		nav("/register");
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
			<img
				src={Agriculture}
				alt=""
				style={{ height: "100vh", width: "100%", objectFit: "cover" }}
			/>

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
						sx={{ color: "#0098b2", textAlign: "center", mb: 2 }}
					>
						Sign In
					</Typography>
					<CustomTextField
						title="Email"
						placeholder="Enter your email"
						borderColor="#0098b2"
						name="email"
						value={formData.email}
						error={errors.email}
						helperText={errors.email}
						onChange={handleChange}
					/>
					<CustomTextField
						title="Password"
						placeholder="Enter your password"
						type="password"
						borderColor="#0098b2"
						name="password"
						value={formData.password}
						error={errors.password}
						helperText={errors.password}
						sx={{ mt: 2 }}
						onChange={handleChange}
					/>
					<Button
						variant="contained"
						fullWidth
						sx={{
							mt: 3,
							bgcolor: "#0098b2",
							color: "#ffffff",
							"&:hover": { bgcolor: "#006f83" },
						}}
						type="submit"
					>
						Login
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
					Don't have an account? Sign Up
				</Typography>
			</Paper>
		</Box>
	);
};

export default Login;
