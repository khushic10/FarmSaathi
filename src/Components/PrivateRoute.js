import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

const PrivateRoute = ({ children }) => {
	const [cookies] = useCookies(["userToken"]);
	const location = useLocation();
	const navigate = useNavigate();
	const [openDialog, setOpenDialog] = useState(!cookies.userToken); // Open dialog if no token

	const handleConfirm = () => {
		setOpenDialog(false);
		navigate("/login", { state: { from: location.pathname } }); // Redirect to login
	};

	const handleCancel = () => {
		setOpenDialog(false);
		navigate(-1); // Go back to the previous page
	};

	if (!cookies.userToken) {
		return (
			<>
				<Dialog open={openDialog}>
					<DialogTitle>
						Accessing this functionality requires logging in. How would you like
						to continue?
					</DialogTitle>
					<DialogActions>
						<Button onClick={handleCancel}>Cancel</Button>
						<Button
							onClick={handleConfirm}
							variant="contained"
							autoFocus
							sx={{
								backgroundColor: "#0098b2", // Fixed color
								color: "white",
								"&:hover": {
									backgroundColor: "#0098d1", // Add a hover effect
								},
							}}
						>
							Login
						</Button>
					</DialogActions>
				</Dialog>
			</>
		);
	}

	return children;
};

export default PrivateRoute;
