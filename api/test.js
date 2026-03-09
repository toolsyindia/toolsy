export default function handler(req, res) {
  res.status(200).json({ message: "Connected! The server is working." });
}