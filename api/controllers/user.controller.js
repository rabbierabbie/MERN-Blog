export const test = (req, res) => {
  res.json({ message: 'API is working!' });
};
//This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using the JSON. stringify() method. The entire body is sent including {}