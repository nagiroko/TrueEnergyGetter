import React, { useState } from "react";
import { useForm } from "react-hook-form";
import supabase from "./supabaseClient";

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [response, setResponse] = useState(null);

  const onSubmit = async formData => {
    console.log(formData);
    
    const { data, error } = await supabase
      .from('Emails')
      .insert([{ Emails: formData.email }])
      .select();

    if (error) {
      console.error('Error inserting data:', error);
    } else {
      console.log('Data inserted successfully:', data);
      setResponse(data);
    }
  };

  return (
    <div>
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
      {response && (
        <div>
          <h3>Inserted Data:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
