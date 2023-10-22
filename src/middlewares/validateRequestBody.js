const validateRequestBody = joiSchema => async (request, response, next) => {
  try {
    await joiSchema.validateAsync(request.body);

    next();
  } catch (error) {
    console.log(error)
    return response.status(400).json(error.message);
  }
}

module.exports = validateRequestBody;