import { table } from "../../lib/airtable";
const upvoteCoffeeStore = async (req, res) => {
  if (req.method === "PUT") {
    try {
      const { id } = req.body;
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
        const newUpvote = parseInt(filterData[0].vote) + parseInt(1);
        const response = await table.update([
          {
            id: filterData[0].rid,
            fields: {
              vote: newUpvote,
            },
          },
        ]);
        res.json(response);
      } else {
        res.status(404);
        res.send("not found by id");
      }
    } catch (error) {
      res.status(500);
      res.send({ error });
    }
  }
};

export default upvoteCoffeeStore;
