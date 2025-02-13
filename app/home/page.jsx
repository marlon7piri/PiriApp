
import React from "react";
import Areas from "./Areas";
import styles from "./home.module.css";
import { getAreas } from "../libs/actions/areas/get-areas";
import { getServerSession } from "next-auth";
import { authoptions } from "../api/auth/[...nextauth]/route";


const Home = async() => {
  const session = await getServerSession(authoptions)
  const areas = await getAreas( session?.user?.restaurante_id)

  
  return (
    <div className={styles.home_section}>
      <Areas areas={areas}/>
    </div>
  );
};

export default Home;
