const validateRequestBody = joiSchema => async (request, response, next) => {
    try {
        await joiSchema.validateAsync(request.body);
        next();
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

module.exports = {
    validateRequestBody
}