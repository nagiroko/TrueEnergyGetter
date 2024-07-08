import React from "react";
import { useForm } from "react-hook-form";
import supabase from "./supabaseClient";

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = async data => {
    console.log(data);
    
const { Data = data, error } = await supabase
.from('Emails')
.insert([
  { Emails: email},
])
.select()
if (error) {
  console.error('Error inserting data:', error);
} else {
  console.log('Data inserted successfully:', data);
  setResponse(data);
}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Email"
        {...register("email", { required: "Email is required" })}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <input
        type="password"
        placeholder="Password"
        {...register("password", { 
          required: "Password is required", 
          minLength: { value: 8, message: "Password must be at least 8 characters long" }
        })}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <input type="submit" />
    </form>
  );
}

