
import React, { /* useEffect, useState  */} from "react";
import Areas from "./Areas";
import styles from "./home.module.css";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

const Home = async() => {


  return (
    <div className={styles.home_section}>
      <Areas />
    </div>
  );
};

export default Home;
