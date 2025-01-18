import React, { useEffect, useState } from "react";
import "./Styles/Crops.scss";
import CloseIcon from "@mui/icons-material/Close";
import SearchBar from "../Components/Search";
import Pagination from "../Components/Pagination/Pagination";
import { useNavigate, useParams } from "react-router-dom";

const Crops = () => {
	const { page } = useParams();
	const nav = useNavigate();
	const [crops, setCrops] = useState([]);
	const [filteredCrops, setFilteredCrops] = useState([]); // To store filtered crops
	const [selectedCrop, setSelectedCrop] = useState(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [searchError, setSearchError] = useState("");
	const [currentPage, setCurrentPage] = useState(Number(page));
	const cropsPerPage = 9; // Number of crops per page

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("/Data.json"); // Fetch from public directory
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setCrops(data);
				setFilteredCrops(data); // Initialize filteredCrops with the full data
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
		};
		window.scrollTo({ top: 0, behavior: "smooth" });

		fetchData();
	}, []);
	useEffect(() => {
		setCurrentPage(Number(page) || 1);
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [page]);

	// Handle opening and closing popup with animation
	useEffect(() => {
		if (isPopupOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.body.style.overflow = "";
		};
	}, [isPopupOpen]);

	const openPopup = (crop) => {
		setSelectedCrop(crop);
		setIsPopupOpen(true);
		setIsClosing(false);
	};

	const closePopup = () => {
		setIsClosing(true);
		setTimeout(() => {
			setIsPopupOpen(false);
			setSelectedCrop(null);
		}, 500);
	};

	const handleSearch = (searchQuery) => {
		if (searchQuery) {
			const searchResults = crops.filter(
				(crop) =>
					crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					crop.nepali.toLowerCase().includes(searchQuery.toLowerCase()) // Search by Nepali name too
			);
			setFilteredCrops(searchResults);
			if (searchResults.length === 0) {
				setSearchError("No Crops Found");
			} else {
				setSearchError("");
			}
		} else {
			setFilteredCrops(crops);
			setSearchError("");
		}
		nav("/crops/1");
		setCurrentPage(1); // Reset to first page when searching
	};

	// Get crops for the current page
	const indexOfLastCrop = currentPage * cropsPerPage;
	const indexOfFirstCrop = indexOfLastCrop - cropsPerPage;
	const currentCrops = filteredCrops.slice(indexOfFirstCrop, indexOfLastCrop);

	// Total number of pages
	const totalPages = Math.ceil(filteredCrops.length / cropsPerPage);

	// Handle page change
	const handlePageChange = (newPage) => {
		nav(`/crops/${newPage}`);
	};

	return (
		<div className="crop-list-main">
			<div className="crop-list">
				<div className="crop-search">
					<SearchBar onSearch={handleSearch} />
				</div>
				<div className="crop-list-outer">
					{searchError && <div className="crop-error">{searchError}</div>}
					<div className="crop-list-inner">
						{currentCrops &&
							currentCrops.map((crop) => (
								<div
									key={crop.id}
									className="crop-item"
									onClick={() => openPopup(crop)}
								>
									<h2>
										{crop.name} ({crop.nepali})
									</h2>
									<img src={crop.image_url} alt={crop.name} />
								</div>
							))}
					</div>

					{/* Pagination Component */}
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>

					{/* Popup */}
					{isPopupOpen && selectedCrop && (
						<div className="crop-popup">
							<div className="popup-overlay" onClick={closePopup}></div>
							<div className={`popup-content ${isClosing ? "closing" : ""}`}>
								<div className="popup-left">
									<button onClick={closePopup}>
										<CloseIcon />
									</button>
									<div className="popup-left-inner">
										<h3>
											{selectedCrop.name} <br />({selectedCrop.nepali})
										</h3>
										<img src={selectedCrop.image_url} alt={selectedCrop.name} />
									</div>
								</div>
								<div className="popup-right">
									<div className="crop-season">
										Best Season to grow: {selectedCrop.season}
									</div>
									<p>{selectedCrop.details}</p>
									<div className="crop-details">
										<div className="crop-details-inner">
											<div>
												Weather:
												<br />{" "}
												<span className="crop-details-list">
													{selectedCrop.weather}
												</span>
											</div>
											<div>
												Soil Type:
												<br />
												<span className="crop-details-list">
													{selectedCrop.soil_type}
												</span>
											</div>
											<div>
												Water Requirements:
												<br />{" "}
												<span className="crop-details-list">
													{selectedCrop.water_requirements}
												</span>
											</div>
											<div>
												Growth Duration:
												<br />{" "}
												<span className="crop-details-list">
													{selectedCrop.growth_duration}
												</span>
											</div>
											<div>
												Yield:
												<br />{" "}
												<span className="crop-details-list">
													{selectedCrop.yield}
												</span>
											</div>
										</div>
										<div className="crop-details-image">
											<img
												src={selectedCrop.crop_image}
												alt={selectedCrop.name}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Crops;
