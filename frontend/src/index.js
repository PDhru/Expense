import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login"; 
import Register from "./pages/Register";
import AddExpense from "./pages/AddExpense";
import ViewExpenses from "./pages/ViewExpenses"
import ProtectedRoute from './components/ProtectedRoute';
import UpdateExpense from "./pages/UpdateExpense";
import ExpenseChart from "./pages/ExpenseChart";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute ><Layout /></ProtectedRoute>}>
        <Route path="/addexpense" element={<AddExpense />} />
        <Route path="/viewexpense" element={<ViewExpenses />} />
        <Route path="/update-expense/:id" element={<UpdateExpense />} />
        <Route path="/" element={<ExpenseChart />} />
      </Route>
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
