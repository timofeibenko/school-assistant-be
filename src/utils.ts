export const generateResponseBody = (error?: unknown) => {
	const responseBody: {
		success: boolean,
		message?: unknown,
	} = {
		success: !error,
	};

	if (error) {
		responseBody.message = error;
	}

	return responseBody; 
};