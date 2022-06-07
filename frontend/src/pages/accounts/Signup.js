import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { Alert } from "antd";

export default function Signup() {
  const history = useHistory();
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [errors, setError] = useState({});
  const [formDisabled, setformDisabled] = useState(true);
  const onSubmit = (e) => {
    e.preventDefault();

    setError({});
    Axios.post("http://localhost:8000/accounts/signup/", inputs)
      .then((response) => {
        history.push("/accounts/login");
      })
      .catch((error) => {
        if (error.response) {
          setError({
            username: (error.response.data.username || []).join(" "),
            password: (error.response.data.password || []).join(" "),
          });
        }
      });
  };
  useEffect(() => {
    const isEnabled = Object.values(inputs).every((s) => s.length > 0);
    setformDisabled(!isEnabled);
  }, [inputs]);
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input type="text" name="username" onChange={onChange} />
          {errors.username && <Alert type="error" message={errors.username} />}
        </div>
        <div>
          <input type="password" name="password" onChange={onChange} />
          {errors.password && <Alert type="error" message={errors.password} />}
        </div>
        <div>
          <input type="submit" value="회원가입" disabled={formDisabled} />
        </div>
      </form>
    </div>
  );
}
