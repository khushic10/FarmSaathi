import React from "react";
import {
	Box,
	Typography,
	Select,
	MenuItem,
	FormControl,
	FormHelperText,
} from "@mui/material";

const CustomSelect = ({
	title,
	name,
	value,
	onChange,
	options = [],
	error,
	helperText,
	placeholder,
	fullWidth = true,
	variant = "outlined",
	borderColor,
	borderWidth,
	borderRadius,
	minHeight,
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
			</Typography>
			<FormControl
				fullWidth={fullWidth}
				error={!!error}
				variant={variant}
				sx={{ minHeight: minHeight || "auto" }}
			>
				<Select
					name={name}
					value={value}
					onChange={onChange}
					displayEmpty
					sx={{
						"& .MuiSelect-placeholder": {
							color: "gray", // Sets the placeholder color
						},
						"& .MuiOutlinedInput-notchedOutline": {
							borderColor: borderColor || "#136F9A",
							borderWidth: borderWidth || "2.5px",
							borderRadius: borderRadius || "20px",
						},
						"&:hover .MuiOutlinedInput-notchedOutline": {
							borderColor: borderColor || "#136F9A",
						},
						"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
							borderColor: borderColor || "#136F9A",
						},
					}}
				>
					{placeholder && (
						<MenuItem value="" disabled>
							<span style={{ color: "gray" }}>{placeholder}</span>
						</MenuItem>
					)}
					{options.map((option, index) => (
						<MenuItem key={index} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</Select>
				{helperText && <FormHelperText>{helperText}</FormHelperText>}
			</FormControl>
		</Box>
	);
};

export default CustomSelect;
