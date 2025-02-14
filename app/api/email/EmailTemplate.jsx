import React from "react";

const EmailTemplate = ({ pedido }) => {
  return (
    <div>
      <h1>Hola queria hacer un pedido para esta semana</h1> 
      {pedido.map((e) => {
        return (
          <ul key={e.nombre}>
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
