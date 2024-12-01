import { useState } from "react";

const useFormValidation = (initialState) => {
	const [formData, setFormData] = useState(initialState);

	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === "bannerUrls") {
		} else {
			setFormData((prevFormData) => ({
				...prevFormData,
				[name]: value,
			}));
		}

		const validationErrors = validateField(name, value);
		setErrors((prevErrors) => ({
			...prevErrors,
			[name]: validationErrors,
		}));
	};

	const handleFileChange = (e) => {
		const { name, files } = e.target;
		const file = files[0];
		setFormData({
			...formData,
			[name]: file,
		});
		const validationErrors = validateField(name, file);
		setErrors({
			...errors,
			[name]: validationErrors,
		});
	};

	const validateField = (fieldName, value) => {
		let fieldErrors = null;

		if (
			fieldName === "firstName" ||
			fieldName === "lastName" ||
			fieldName === "address" ||
			fieldName === "travelDestination" ||
			fieldName === "remarks" ||
			fieldName === "fullName" ||
			fieldName === "role" ||
			// fieldName === "voucherImageUrl" ||
			fieldName === "numberOfPassengers" ||
			fieldName === "packagePrice" ||
			fieldName === "advancePayment" ||
			fieldName === "fromDate" ||
			fieldName === "toDate" ||
			fieldName === "packageName" ||
			fieldName === "packagePrice"
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
					? `${fieldName} should be 8 characters`
					: null;
		} else if (fieldName === "confirmPassword") {
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
		} else if (fieldName === "email" || fieldName === "applyEmail") {
			fieldErrors =
				!value.trim() || !/\S+@\S+\.\S+/.test(value)
					? "email is invalid"
					: null;
		} else if (fieldName === "numberOfPassengers") {
			fieldErrors = value <= 0 ? "Number Of Passengers is required" : null;
		} else if (fieldName === "packagePrice") {
			fieldErrors = value <= 0 ? "Package Price is required" : null;
		} else if (fieldName === "Advance Payment") {
			fieldErrors = value <= 0 ? "advancePayment is required" : null;
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
		handleFileChange,
		// handleFilesChange,
		validateForm,
	};
};

export default useFormValidation;
