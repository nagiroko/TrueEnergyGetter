import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import supabase from "./supabaseClient";
import "./App.css"; 

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sleepValue, setSleepValue] = useState(6);
  const [amountValue, setAmountValue] = useState(10);
  const [emailList, setEmailList] = useState([]);

  useEffect(() => {
    const fetchEmails = async () => {
      const { data, error } = await supabase.from("SurveyResults").select("Email");
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setEmailList(data.map(item => item.Email));
      }
    };

    fetchEmails();
  }, []);

  const onSubmit = async (formData) => {
    setLoading(true);
    setErrorMessage("");
    setResponse(null);

    // Check if the email already exists
    if (emailList.includes(formData.email)) {
      setLoading(false);
      setErrorMessage("Email already exists");
      return;
    }

    const { data, error } = await supabase
      .from('SurveyResults')
      .insert([{ 
        Email: formData.email, 
        EnergyDrinkName: formData.preference, 
        SleepAverageNight: sleepValue,
        DrinksPerDay: amountValue
      }])
      .select();

    setLoading(false);

    if (error) {
      console.error('Error inserting data:', error);
      setErrorMessage("Failed to insert data");
    } else {
      console.log('Data inserted successfully:', data);
      setResponse(data);
      // Update emailList with the newly inserted email
      setEmailList([...emailList, formData.email]);
      window.alert("Thank you for taking this survey")
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="JohnDoe@aol.com"
          {...register("email", { 
            required: "Email is required", 
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address"
            }
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        {errorMessage && <p>{errorMessage}</p>}

        <div>
          <label>
            <input
              type="radio"
              value="Coffee"
              {...register("preference", { required: "Preference is required" })}
            />
            Coffee
          </label>
          <label>
            <input
              type="radio"
              value="Soda"
              {...register("preference", { required: "Preference is required" })}
            />
            Soda
          </label>
          <label>
            <input
              type="radio"
              value="Energy Drink"
              {...register("preference", { required: "Preference is required" })}
            />
            Energy Drink
          </label>
          <label>
            <input
              type="radio"
              value="Energy Powder"
              {...register("preference", { required: "Preference is required" })}
            />
            Energy Powder
          </label>
          <label>
            <input
              type="radio"
              value="Caffeine Gum"
              {...register("preference", { required: "Preference is required" })}
            />
            Caffeine Gum
          </label>
          <label>
            <input
              type="radio"
              value="Chocolate"
              {...register("preference", { required: "Preference is required" })}
            />
            Chocolate
          </label>
          <label>
            <input
              type="radio"
              value="Tea"
              {...register("preference", { required: "Preference is required" })}
            />
            Tea
          </label>
          <label>
            <input
              type="radio"
              value="Caffeine Pills"
              {...register("preference", { required: "Preference is required" })}
            />
            Caffeine Pills
          </label>
        </div>
        {errors.preference && <p>{errors.preference.message}</p>}

        <div>
          <label>Average Daily Sleep: <span>{sleepValue}</span></label>
          <input
            type="range"
            min="0"
            max="12"
            step="1"
            value={sleepValue}
            {...register("sleep", { required: "Sleep is required" })}
            onChange={(e) => setSleepValue(e.target.value)}
          />

          {errors.sleep && <p>{errors.sleep.message}</p>}
        </div>

        <div>
          <label>Weekly Consumption: <span>{amountValue}</span></label>
          <input
            type="range"
            min="0"
            max="30"
            step="1"
            value={amountValue}
            {...register("DrinksPerDay", { required: "Amount is required" })}
            onChange={(e) => setAmountValue(e.target.value)}
          />
          {errors.DrinksPerDay && <p>{errors.DrinksPerDay.message}</p>}
        </div>

        <input type="submit" value="Submit" disabled={loading} />
      </form>

      {loading && <p>Loading...</p>}
      {response && (
        <div>
          <h3>Inserted Data:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
