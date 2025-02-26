import { useState } from "react";

const useFormValidation = (initialState) => {
	const [formData, setFormData] = useState(initialState);

	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));

		const validationErrors = validateField(name, value);
		setErrors((prevErrors) => ({
			...prevErrors,
			[name]: validationErrors,
		}));
	};

	const validateField = (fieldName, value) => {
		let fieldErrors = null;

		if (
			fieldName === "username" ||
			fieldName === "Crop_Type" ||
			fieldName === "Soil_Type"
		) {
			if (typeof value === "string") {
				fieldErrors = !value.trim() ? `${fieldName} is required` : null;
			}
		} else if (fieldName === "mobileNumber") {
			fieldErrors =
				!value.trim() || !/^9[0-9]{9}$/.test(value)
					? `${fieldName} must be 10 digit and start with 9`
					: null;
		} else if (
			fieldName === "password" ||
			fieldName === "newPassword" ||
			fieldName === "oldPassword"
		) {
			fieldErrors =
				!value.trim() || !/^(?=.{8,})/.test(value)
					? `Password should be 8 characters`
					: null;
		} else if (fieldName === "password2") {
			if (!value.trim() || !/^(?=.{8,})/.test(value))
				fieldErrors = `Confirm Password should be 8 characters`;
			else if (formData.password) {
				if (value !== formData.password) {
					fieldErrors = "Password and Confirm Password must be same.";
				}
			} else if (formData.newPassword) {
				if (value !== formData.newPassword) {
					fieldErrors = "New Password and Confirm Password must be same.";
				}
			} else fieldErrors = null;
		} else if (fieldName === "email") {
			fieldErrors =
				!value.trim() || !/\S+@\S+\.\S+/.test(value)
					? "Email is invalid"
					: null;
		} else if (fieldName === "ph") {
			fieldErrors =
				value < 5 || value > 8 || value === null
					? "The pH value must be between 0 and 14"
					: null;
		} else if (
			fieldName === "Humidity" ||
			fieldName === "Moisture" ||
			fieldName === "moisture" ||
			fieldName === "humidity"
		) {
			fieldErrors =
				value < 0 || value > 100 || value === null
					? `The ${fieldName} value must be between 0 and 100`
					: null;
		} else if (fieldName === "temperature" || fieldName === "Temperature") {
			fieldErrors =
				value < 0 || value > 45 || value === null
					? "The temperature value must be between 0 to 50"
					: null;
		} else if (fieldName === "rainfall" || fieldName === "Rainfall") {
			fieldErrors =
				value < 0 || value > 3000 || value === null
					? "The rainfall value must be 0 to 12000"
					: null;
		} else if (fieldName === "N" || fieldName === "Nitrogen") {
			fieldErrors =
				value < 10 || value > 200 || value === null
					? "The nitrogen value must be between 10 to 200"
					: null;
		} else if (fieldName === "P" || fieldName === "Phosphorous") {
			fieldErrors =
				value < 10 || value > 150 || value === null
					? "The Phosphorus value must be between 10 to 150"
					: null;
		} else if (fieldName === "K" || fieldName === "Potassium") {
			fieldErrors =
				value < 50 || value > 250 || value === null
					? "The Potassium value must be between 50 to 250"
					: null;
		} else {
			fieldErrors = value === null ? `${fieldName} is required` : null;
		}
		return fieldErrors;
	};

	const validateForm = (data) => {
		let errors = {};
		for (let field in initialState) {
			const fieldErrors = validateField(field, data[field]);
			if (fieldErrors) {
				errors[field] = fieldErrors;
			}
		}

		return errors;
	};

	return {
		formData,
		setFormData,
		errors,
		setErrors,
		handleChange,
		// handleFilesChange,
		validateForm,
	};
};

export default useFormValidation;
