import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import { getItems } from "@/app/libs/actions/items/getItems";
import { getServerSession } from "next-auth";
import TablaPlatos from "./TablaPlatos";
import NavPlatos from "./NavPlatos";
import Container from "@/app/components/Container";

const Platos = async ({ searchParams }) => {
  const session = await getServerSession(authoptions);
  const query = searchParams?.query || "";
  const { items } = await getItems(query, session?.user?.restaurante_id);

  return (
    <Container>
      <NavPlatos />
      <h1 className="text-3xl font-bold text-center">Items</h1>
      <TablaPlatos items={items} />
    </Container>
  );
};

export default Platos;
