import React from "react";
import {
	Box,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const CustomTextField = ({
	title,
	subtitle,
	name,
	value,
	onChange,
	error,
	helperText,
	placeholder,
	type,
	fullWidth = true,
	variant = "outlined",
	borderColor,
	borderWidth,
	borderRadius,
	minHeight,
	eye,
	onEye,
}) => {
	return (
		<Box>
			<Typography
				sx={{
					fontFamily: "Nunito",
					fontSize: "1rem",
					fontWeight: 700,
					lineHeight: "1.8rem",
					textAlign: "left",
					marginLeft: "5px",
				}}
			>
				{title}
				{subtitle && <span style={{ color: "#A4A4A4AA" }}> ({subtitle})</span>}
			</Typography>
			<TextField
				name={name}
				value={value}
				onChange={onChange}
				error={!!error}
				helperText={error ? helperText : ""}
				placeholder={placeholder}
				type={type || "text"}
				fullWidth={fullWidth}
				variant={variant}
				InputProps={{
					endAdornment: eye !== undefined && (
						<InputAdornment position="end">
							<IconButton onClick={onEye} edge="end">
								{eye ? <VisibilityIcon /> : <VisibilityOffIcon />}
							</IconButton>
						</InputAdornment>
					),
				}}
				sx={{
					"& .MuiOutlinedInput-root": {
						"& fieldset": {
							borderColor: borderColor || "#136F9A",
							borderWidth: borderWidth || "2.5px",
							borderRadius: borderRadius || "20px",
						},
						"&:hover fieldset": {
							borderColor: borderColor || "#136F9A",
							borderWidth: borderWidth || "2.5px",
							borderRadius: borderRadius || "20px",
						},
						"&.Mui-focused fieldset": {
							borderColor: borderColor || "#136F9A",
							borderRadius: borderRadius || "20px",
						},
						minHeight: minHeight || "auto",
					},
				}}
			/>
		</Box>
	);
};

export default CustomTextField;
