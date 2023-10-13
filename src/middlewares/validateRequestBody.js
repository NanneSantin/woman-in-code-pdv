const validateRequestBody = (joiSchema) => async (request, response, next) => {
  // console.log(joiSchema);
  try {
    await joiSchema.validateAsync(request.body);
    console.log("entrou no try");
    next();
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
};

module.exports = {
  validateRequestBody,
};
