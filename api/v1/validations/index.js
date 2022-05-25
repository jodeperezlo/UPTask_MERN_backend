const validateObjectID = (req, res, next) => {
	const { id } = req.params;
	if (!id.match(/^[0-9a-fA-F]{24}$/)) {
		const error = new Error('El ID no es válido.');
		return res.status(400).json({ msg: error.message });
	}
	return next();
};

export { validateObjectID };
