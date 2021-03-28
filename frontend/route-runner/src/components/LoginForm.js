import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import { loggingInNormal } from "../helpers/actionCreators";
const LoginForm = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [isInvalid, setIsInvalid] = useState(true);
  const [isTouched, setIsTouched] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value == "") {
      setIsTouched(true);
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
    setFormData((data) => ({ ...data, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loggingInNormal(formData));
  };
  return (
    <div className="card">
      <h4 id="title">Login</h4>
      <div className="card-body">
        <form onSubmit={handleSubmit} className="Login-form">
          <div className="Login-form-items form-group">
            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              required={true}
              type="email"
              id="email"
              className="form-control"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          <div className="Login-form-items form-group">
            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              required={true}
              type={"password"}
              id="password"
              name="password"
              className="form-control"
              onChange={handleChange}
              value={formData.password}
            />
          </div>
          <Button color="primary" className="Login-submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
