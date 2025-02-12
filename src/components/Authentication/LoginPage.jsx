import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "./LoginPage.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../../services/userServices";

const LoginPage = () => {
  const schema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const [formError, setformError] = useState("");
  const onSubmit = async (formData) => {
    try {
      const { data } = await login(formData);
      localStorage.setItem("token", data.token);
      window.location = "/";
      // Handle successful login (e.g., redirect, show success message)
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setformError(err.response.data.message);
      }
    }
  };

  return (
    <section className="flex-align form-page">
      <form className="authentication-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login Form</h2>
        <div className="form-input">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-text-input"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && (
              <em className="form-error">{errors.email.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-text-input"
              placeholder="Enter password"
              {...register("password")}
            />
            {errors.password && (
              <em className="form-error">{errors.password.message}</em>
            )}
          </div>
          {formError && <em className="form-error">{formError}</em>}
          <button type="submit" className="form-submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
