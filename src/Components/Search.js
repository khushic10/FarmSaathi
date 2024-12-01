import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchBar = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearch = (e) => {
		const value = e.target.value;
		setSearchTerm(value);
		onSearch(value);
	};

	const handleClear = () => {
		setSearchTerm("");
		onSearch("");
	};

	return (
		<TextField
			label="Search"
			variant="outlined"
			value={searchTerm}
			onChange={handleSearch}
			sx={{
				"& .MuiOutlinedInput-root": {
					borderRadius: "15px",
					border: "1px solid gray",
					"&.Mui-focused": {
						borderColor: "transparent",
						boxShadow: "none",
					},
				},
			}}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						{searchTerm === "" ? (
							<SearchIcon />
						) : (
							<IconButton onClick={handleClear} aria-label="clear">
								<ClearIcon />
							</IconButton>
						)}
					</InputAdornment>
				),
			}}
			size="small"
		/>
	);
};

export default SearchBar;
