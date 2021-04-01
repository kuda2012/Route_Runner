import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import { SigningUpNormal } from "../helpers/actionCreators";
const SignupForm = () => {
  const initialState = {
    email: "",
    password: "",
    name: "name",
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
    dispatch(SigningUpNormal(formData));
  };
  return (
    <div className="card">
      <h4 id="title">Signup</h4>
      <div className="card-body">
        <form onSubmit={handleSubmit} className="Login-form">
          <div className="Login-form-items form-group">
            <label htmlFor="name">
              <b>Name</b>
            </label>
            <input
              required={true}
              type="text"
              id="name"
              className="form-control"
              name="text"
              onChange={handleChange}
              value={formData.text}
            />
          </div>
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

export default SignupForm;
