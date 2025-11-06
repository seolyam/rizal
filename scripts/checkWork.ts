import { getWorks } from "@/lib/data";

async function run() {
  const works = await getWorks();
  const match = works.find((work) => work.title === "Noli Me Tángere");
  console.log(match);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
