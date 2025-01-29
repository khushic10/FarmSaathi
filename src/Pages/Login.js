// LoginForm.js
import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import CustomTextField from "../Components/CustomTextField";
import { useLocation, useNavigate } from "react-router-dom";
import Agriculture from "../Assets/agriculture.jpeg";
import { useCookies } from "react-cookie";
import useFormValidation from "../Hooks/useFormValidation";
import BACKEND_URL from "../Config/Configure";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
	const nav = useNavigate();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const location = useLocation();
	const from = location.state?.from || "/";
	const message = location.state?.message;

	useEffect(() => {
		window.scrollTo(0, 0);
		if (message) {
			toast.success(message);
			nav(location.pathname, { replace: true });
		}
	}, [message]);

	const [eye, setEye] = useState(true);

	const handleTogglePassword = () => {
		setEye(!eye);
	};

	const initialFormState = {
		email: "",
		password: "",
	};

	const { formData, setErrors, errors, handleChange, validateForm } =
		useFormValidation(initialFormState);

	const [cookies, setCookie] = useCookies(["userToken"]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const validationErrors = validateForm(formData);

		if (Object.keys(validationErrors).length === 0) {
			setLoading(true);
			try {
				const response = await fetch(`${BACKEND_URL}/api/login/`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				});
				if (response.ok) {
					const data = await response.json();
					setCookie("userToken", `${data.access}`, {
						path: "/",
						maxAge: data.tokenExpiryTime,
					});
					setLoading(false);
					nav(from);
				} else {
					const error = await response.json();
					setError(error.message);
					setLoading(false);
				}
			} catch (error) {
				console.log("Fetch error:", error.message);
			}

			setLoading(false);
		} else {
			setErrors(validationErrors);
		}
	};
	const onSwitch = () => {
		nav("/register");
	};

	return (
		<>
			<ToastContainer
				position="top-center"
				autoClose={1500}
				hideProgressBar={true}
				closeButton={false}
			/>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "flex-start",
					position: "relative",
				}}
			>
				<img
					src={Agriculture}
					alt=""
					style={{
						height: "86vh",
						width: "100%",
						objectFit: "cover",
						opacity: "90%",
					}}
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
							type={eye ? "password" : "text"}
							borderColor="#0098b2"
							name="password"
							value={formData.password}
							error={errors.password}
							helperText={errors.password}
							sx={{ mt: 2 }}
							onChange={handleChange}
							eye={eye}
							onEye={handleTogglePassword}
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
							disabled={loading}
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
		</>
	);
};

export default Login;
