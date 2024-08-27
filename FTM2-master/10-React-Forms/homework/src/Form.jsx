import React, { useState } from "react";

export function validate(input) {
  let errors = {};

  if (!input.username) {
    errors.username = "Username is required";
  } else if (!/\S+@\S\.\S+/.test(input.username)) {
    errors.username = "Username is invalid";
  }

  if (!input.password) {
    errors.password = "Password is required";
  } else if (!/(?=.*[0-9])/.test(input.password)) {
    errors.password = "Password is invalid";
  }
}

export default function Form() {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form>
      <div>
        <label>Username: </label>
        <input
          className={errors.username && "danger"}
          type="text"
          name="username"
          value={input.username}
          onChange={handleInputChange}
        />
        {errors.username && <p className="danger">{errors.username}</p>}
      </div>
      <div>
        <label>Password: </label>
        <input
          className={errors.password && "danger"}
          type="password"
          name="password"
          value={input.password}
          onChange={handleInputChange}
        />
        {errors.password && <p className="danger">{errors.password}</p>}
      </div>
      <div>
        <input type="submit" value="Ingresar" />
      </div>
    </form>
  );
}
