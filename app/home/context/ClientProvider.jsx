"use client";

const { createContext, useContext, useState, useEffect } = require("react");

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
 
  const [pedidos, setPedidos] = useState([]);


 /*  useEffect(()=>{
    const pedidos = JSON.parse(localStorage.getItem("pedidos"));
  
    setPedidos(pedidos)
   
   
  
  },[])
  
  useEffect(()=>{
  localStorage.setItem("pedidos",JSON.stringify(pedidos))
  
  },[pedidos]) */
  return (
    <ClientContext.Provider value={{ pedidos, setPedidos }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClientContext = () => {
  return useContext(ClientContext);
};
