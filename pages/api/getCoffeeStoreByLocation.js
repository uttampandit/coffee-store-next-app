import { getCoffeeStore } from "../../lib/coffee-store";

const getCoffeeStoreByLocation = async (req, res) => {
  const { latLong } = req.query;
  try {
    const coffeeStores = await getCoffeeStore(latLong);
    res.json(coffeeStores);
  } catch (error) {
    console.error("Internal error", error);
    res.status(500);
  }
};
export default getCoffeeStoreByLocation;
