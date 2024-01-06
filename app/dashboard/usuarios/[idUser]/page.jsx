"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import {  useRouter } from "next/navigation";

const url = "http://localhost:3000";

const schema = yup
  .object({
    name: yup.string().max(20).required(),
    password: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.number().positive().required()
  })
  .required();

const EditarUsuario = ({params}) => {
    const router =useRouter()
    

  const {
    register,
    handleSubmit,

    formState: { errors,isLoading },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(()=>{

    const getUnSoloUsuario=async ()=>{
      try {
        const res =  await  fetch(`${url}/api/usuarios/${params.idUser}`);

        console.log(res)
  
      }catch(error){
        console.log(
          error
        )
      }
    }
    getUnSoloUsuario()
   
  },[])
  const enviarData = async (data) => {
   try {
    const res =  await  fetch(`${url}/api/usuarios/${params.idUser}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
      },
      body:JSON.stringify(data)
    });

if(!res.ok){
  toast.error("Error")

}else{
  toast.success("Usuario creado")
  router.push('/dashboard/usuarios')
  router.refresh()
}
    
    
       
   } catch (error) {
    console.log(error)
   }
  
  };
  return (
    <form
      onSubmit={handleSubmit(enviarData)}
      className="flex flex-col m-auto p-4 w-2/4 gap-4"
    >
      <input
        type="text"
        {...register("name", { required: true })}
        placeholder="nombre"
      />
      {errors.name && (
        <span className="text-red-500">
          {" "}
          El nombre del usuario es requerido y tiene que ser maximo 20
          caracteres
        </span>
      )}
      <input
        type="password"
        {...register("password", { required: true })}
        placeholder="password"
      />
      {errors.password && (
        <span className="text-red-500">
          {" "}
          La contraseña es requerida
        </span>
      )}
      <input
        type="email"
        {...register("email", { required: true })}
        placeholder="email"
      />
      {errors.email && (
        <span className="text-red-500">
          {" "}
         Correo no valido
        </span>
      )}

      <input
        type="number"
        {...register("phone", { required: true })}
        placeholder="telefono"
      />
      {errors.phone && (
        <span className="text-red-500">
          {" "}
          Solo son numeros del 0 al 9
        </span>
      )}
        <input
        type="text"
        {...register("address", { required: true })}
        placeholder="direccion"
      />
      {errors.address && (
        <span className="text-red-500">
          {" "}
          La direccion es requerida
        </span>
      )}

      <div className="flex gap-4 justify-center items-center">
        <div>
          isAdmin{" "}
          <input
            type="radio"
            value={true}
            {...register("isAdmin", { required: true })}
          />
        </div>
        <div>
          noAdmin{" "}
          <input
            type="radio"
            value={false}
            {...register("isAdmin", { required: true })}
          />
        </div>
      </div>
      <div className="flex gap-4 justify-center items-center">
        <div>
        Activo{" "}
          <input
            type="radio"
            value={true}
            {...register("isActive", { required: true })}
          />
        </div>
        <div>
          Inactivo{" "}
          <input
            type="radio"
            value={false}
            {...register("isActive", { required: true })}
          />
        </div>
      
      </div>
      <input  disabled={isLoading} type="submit" value="Crear"  className="bg-sky-500 px-4 py-2 rounded-md text-slate-900 hover:bg-sky-900 transition duration-500 hover:text-slate-50 cursor-pointer"/>
    </form>
  );
};

export default EditarUsuario;
