const validateRequestBody = joiSchema => async (request, response, next) => {
  try {
    await joiSchema.validateAsync(request.body);

    next();
  } catch (error) {
    console.log('erro 1')
    return response.status(400).json(error.message);
  }
}

module.exports = validateRequestBody;