import React from "react";

const EmailTemplate = ({ pedido }) => {
  console.log(pedido);
  return (
    <div>
      <h1>Hola queria hacer un pedido para esta semana</h1> 
      {pedido.map((e) => {
        return (
          <ul>
            <li>
              {e.nombre} - {e.cantidad} /{e.unidad}
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default EmailTemplate;
