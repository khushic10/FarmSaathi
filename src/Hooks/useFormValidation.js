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
			fieldName === "userName" ||
			fieldName === "crop_type" ||
			fieldName === "soil_type"
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
			fieldName === "password2" ||
			fieldName === "newPassword" ||
			fieldName === "oldPassword"
		) {
			fieldErrors =
				!value.trim() || !/^(?=.{8,})/.test(value)
					? `${fieldName} should be 8 characters`
					: null;
		} else if (fieldName === "password2") {
			if (!value.trim() || !/^(?=.{8,})/.test(value))
				fieldErrors = `${fieldName} should be 8 characters`;
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
					? "email is invalid"
					: null;
		} else if (fieldName === "packagePrice") {
			fieldErrors = value <= 0 ? "Package Price is required" : null;
		} else if (fieldName === "ph") {
			fieldErrors =
				value < 0 || value > 14 || value === null
					? "The pH value must be between 0 and 14"
					: null;
		} else if (fieldName === "humidity" || fieldName === "moisture") {
			fieldErrors =
				value < 0 || value > 100 || value === null
					? `The ${fieldName} value must be between 0 and 100`
					: null;
		} else if (fieldName === "temperature") {
			fieldErrors =
				value < -10 || value > 60 || value === null
					? "The temperature value must be between -10 to 60"
					: null;
		} else if (fieldName === "rainfall") {
			fieldErrors =
				value < 0 || value > 12000 || value === null
					? "The rainfall value must be 0 to 12000"
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
