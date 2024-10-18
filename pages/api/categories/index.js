export default async function categories(req, res) {
  if (req.method === "GET") {
    try {
      const request = await fetch(`http://localhost:3000/categories.json`);
      const categories = await request.json();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: "Categories not found." });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
