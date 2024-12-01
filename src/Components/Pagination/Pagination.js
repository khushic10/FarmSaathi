import React from "react";
import { Box, Button, Typography } from "@mui/material";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const getPageNumbers = () => {
		const pages = [];

		if (totalPages <= 3) {
			// If total pages are less than or equal to 3, show all page numbers
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			// Always show the first page
			pages.push(1);

			// Show '...' before the current page if necessary
			if (currentPage > 2) {
				pages.push("...");
			}

			// Show current page and its adjacent pages
			if (currentPage > 1 && currentPage < totalPages) {
				pages.push(currentPage);
			}

			// Show '...' after the current page if necessary
			if (currentPage < totalPages - 1) {
				pages.push("...");
			}

			// Always show the last page
			pages.push(totalPages);
		}

		return pages;
	};

	const pageNumbers = getPageNumbers();

	return (
		<Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				{/* Previous Button */}
				<Button
					variant="contained"
					disabled={currentPage === 1}
					onClick={() => onPageChange(currentPage - 1)}
					sx={{
						minWidth: 100,
						mx: 0.5,
						backgroundColor: "#544c2b", // Custom background color
						"&:hover": {
							backgroundColor: "#34495E", // Optional: Customize hover color
						},
					}}
				>
					Previous
				</Button>

				{/* Page Numbers */}
				{pageNumbers.map((pageNumber, index) =>
					pageNumber === "..." ? (
						<Typography
							key={index}
							sx={{ mx: 0.5, minWidth: 40, textAlign: "center" }}
						>
							...
						</Typography>
					) : (
						<Button
							key={index}
							variant={currentPage === pageNumber ? "contained" : "outlined"}
							onClick={() => onPageChange(pageNumber)}
							disabled={currentPage === pageNumber}
							sx={{
								mx: 0.2,
								minWidth: 40,
								height: 40,
								backgroundColor:
									currentPage === pageNumber ? "#544c2b" : "transparent", // Set background for the current page
								color: currentPage === pageNumber ? "#fff" : "#544c2b", // Set text color
								borderColor: "#2C3E50", // Set border color for outlined buttons
								"&:hover": {
									backgroundColor:
										currentPage === pageNumber ? "#34495E" : "#f0f0f0", // Optional hover styles
								},
							}}
						>
							{pageNumber}
						</Button>
					)
				)}

				{/* Next Button */}
				<Button
					variant="contained"
					disabled={currentPage >= totalPages}
					onClick={() => onPageChange(currentPage + 1)}
					sx={{
						minWidth: 100,
						mx: 0.5,
						backgroundColor: "#544c2b", // Custom background color
						"&:hover": {
							backgroundColor: "#34495E", // Optional: Customize hover color
						},
					}}
				>
					Next
				</Button>
			</Box>
		</Box>
	);
};

export default Pagination;
