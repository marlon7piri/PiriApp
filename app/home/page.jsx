
import React, { /* useEffect, useState  */} from "react";
import Areas from "./Areas";
import styles from "./home.module.css";


const Home = () => {


  return (
    <div className={styles.home_section}>
      <Areas />
    </div>
  );
};

export default Home;
