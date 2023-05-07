import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ManagerLogin from "./managerLogin";
import axios from "axios";

// Mock the axios POST request
jest.mock("axios");
axios.post.mockResolvedValue({});

test("error message is not displayed by default", () => {
  const { queryByText } = render(<ManagerLogin />);
  expect(queryByText(/invalid login details/i)).not.toBeInTheDocument();
  expect(queryByText(/an unexpected error occurred/i)).not.toBeInTheDocument();
});

test("form fields are rendered", () => {
  const { getByLabelText } = render(<ManagerLogin />);
  expect(getByLabelText(/username:/i)).toBeInTheDocument();
  expect(getByLabelText(/password:/i)).toBeInTheDocument();
});

test("form submission triggers handleSubmit function", async () => {
  const { getByLabelText, getByText } = render(<ManagerLogin />);
  const usernameInput = getByLabelText(/username:/i);
  const passwordInput = getByLabelText(/password:/i);
  const submitButton = getByText(/login/i);

  fireEvent.change(usernameInput, { target: { value: "testuser" } });
  fireEvent.change(passwordInput, { target: { value: "testpassword" } });
  fireEvent.click(submitButton);

  expect(axios.post).toHaveBeenCalledTimes(1);
  expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/user/login", {
    username: "testuser",
    password: "testpassword",
  });
});
