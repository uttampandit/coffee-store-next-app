import { table } from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    try {
      const coffeestore = req.body;
      //finding if exists
      if (!coffeestore.id) {
        throw new Error("no id mentioned");
      }

      const data = await table
        .select({
          filterByFormula: `id="${coffeestore.id}"`,
        })
        .firstPage();

      const filterData = data.map((store) => {
        return {
          ...store.fields,
        };
      });
      //finding if present or not
      if (filterData.length > 0) {
        //already present
        res.json(filterData);
      } else {
        //need to create
        if (!coffeestore.name) {
          throw new Error("name is required");
        }

        const res1 = await table.create([
          {
            fields: {
              ...coffeestore,
            },
          },
        ]);

        res.json(res1);
      }
    } catch (error) {
      res.status(500);
      res.json({ error });
      console.log(error.message);
    }
  }
};

export default createCoffeeStore;
