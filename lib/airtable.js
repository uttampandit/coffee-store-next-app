const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_TABLE_KEY
);
const table = base("CoffeeStores");

export { base, table };
