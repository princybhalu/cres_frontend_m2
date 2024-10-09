import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { activateUser } from "../services/api/user";
import logo from "../assets/images/logo.jpg"

// Yup Validation Schema
const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  dateOfBirth: yup
    .date("Invalid Date Of Birth")
    .required("Date of Birth is required")
    .nullable()
    .max(new Date(), "Date of Birth cannot be in the future"),
});

const Register = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      console.log("Form data: ", data);

      let req = {
        token , data_of_birth : data.dateOfBirth ,
        firstname: data.firstName ,
        lastname: data.lastName ,
        password : data.password
      }
      await activateUser(req)
      navigate("/login"); // Redirect to homepage after successful registration
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md md:w-[400px] lg:w-[450px]"
      >
        <div className="mx-auto">
          <img src={logo} className="w-64 h-64 mx-auto" alt="Logo" />
        </div>

        {/* First Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
            First Name
          </label>
          <input
            {...register("firstName")}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.firstName ? "border-red-500" : ""
              }`}
            id="firstName"
            type="text"
            placeholder="First Name"
          />
          {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName.message}</p>}
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
            Last Name
          </label>
          <input
            {...register("lastName")}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.lastName ? "border-red-500" : ""
              }`}
            id="lastName"
            type="text"
            placeholder="Last Name"
          />
          {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateOfBirth">
            Date of Birth
          </label>
          <input
            {...register("dateOfBirth")}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.dateOfBirth ? "border-red-500" : ""
              }`}
            id="dateOfBirth"
            type="date"
          />
          {errors.dateOfBirth && <p className="text-red-500 text-xs italic">{errors.dateOfBirth.message}</p>}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            {...register("password")}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? "border-red-500" : ""
              }`}
            id="password"
            type="password"
            placeholder="Password"
          />
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            {...register("confirmPassword")}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.confirmPassword ? "border-red-500" : ""
              }`}
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword.message}</p>}
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
