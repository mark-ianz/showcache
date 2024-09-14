export function throwServerError(
  res,
  customMessage = "Server Error. Please try again later."
) {
  return res.status(500).json({ error: customMessage });
}
