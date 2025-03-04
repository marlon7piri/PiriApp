import React from "react";
import { PiPackageLight } from "react-icons/pi";

const ProductIcon = ({ styles = "w-6 h-6" }) => {
  return <PiPackageLight className={styles} />;
};

export default ProductIcon;
