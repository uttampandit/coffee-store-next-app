import { table } from "../../lib/airtable";
const getCoffeeStoreById = async (req, res) => {
  try {
    const { id } = req.query;
    //finding if exists
    if (!id) {
      throw new Error("no id mentioned");
    }

    const data = await table
      .select({
        filterByFormula: `id="${id}"`,
      })
      .firstPage();

    const filterData = data.map((store) => {
      return {
        ...store.fields,
        rid: store.id,
      };
    });
    //finding if present or not
    if (filterData.length > 0) {
      //already present
      res.json(filterData);
    } else {
      res.send("not found by id");
    }
  } catch (error) {
    res.status(500);
    res.json({ error });
    console.log(error.message);
  }
};

export default getCoffeeStoreById;
