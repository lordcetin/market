import { MongoClient } from "mongodb";

export default async (req, res) => {
  if (req.method == 'GET') {
    const client = await MongoClient.connect(process.env.MONGO_URI);
    const db = client.db();
    const usersCollection = db.collection("nfts");

    try {
      const products = await usersCollection.find()
      res.json({
        status: 'success',
        result: products.length,
        products
      })
    } catch (error) {
      return res.status(500).json({ err: err.message })
    }
  }
};
