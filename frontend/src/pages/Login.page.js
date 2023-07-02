import { Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";
import "./Login.css";
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { emailPasswordSignup } = useContext(UserContext);

  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };


  const redirectNow = () => {
    const redirectTo = location.search.replace("?redirectTo=", "");
    navigate(redirectTo ? redirectTo : "/");
  };
  
  const redirectNow2 = () => {
    alert("Successfully registered! Please Sign in.")
  };

  const loadUser = async () => {
    if (!user) {
      const fetchedUser = await fetchUser();
      if (fetchedUser) {
        redirectNow();
      }
    }
  };

  useEffect(() => {
    loadUser(); 
  }, []);

  const onSubmit = async (event) => {
    try {
      const user = await emailPasswordLogin(form.email, form.password);
      if (user) {
        redirectNow();
      }
    } catch (error) {
      alert(error);
    }
  };
  const onSubmit2 = async () => {
    try {
      const user = await emailPasswordSignup(form.email, form.password);
      if (user) {
        redirectNow2();
      }
    } catch (error) {
      alert(error);
    }
  };
  const toggleForm = () => {
    const cnt = document.querySelector("#cont55");
    cnt.classList.toggle("active");
  };
  return (
    <div>
      <section>
        <div className="cnt" id="cont55">
          <div className="user signinBx">
            <div className="imgBx">
              <img
                src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img1.jpg"
                alt=""
              />
            </div>
            <div className="formBx">
              <form>
                <h2>Sign In</h2>
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  name="email"
                  value={form.email}
                  onChange={onFormInputChange}
                  style={{ marginBottom: "1rem" }}
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  name="password"
                  value={form.password}
                  onChange={onFormInputChange}
                  style={{ marginBottom: "1rem" }}
                />
                <Button variant="contained" color="primary" onClick={onSubmit}>
                  Login
                </Button>
                <p className="signup">
                  Don't have an account ?
                  <a href="#" onClick={toggleForm}>
                    Sign Up.
                  </a>
                </p>
              </form>
            </div>
          </div>
          <div className="user signupBx">
            <div className="formBx">
              <form>
                <h2>Create an account</h2>
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  name="email"
                  value={form.email}
                  onInput={onFormInputChange}
                  style={{ marginBottom: "1rem" }}
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  name="password"
                  value={form.password}
                  onInput={onFormInputChange}
                  style={{ marginBottom: "1rem" }}
                />
                <Button variant="contained" color="primary" onClick={onSubmit2}>
                  Signup
                </Button>
                <p className="signup">
                  Already have an account ?
                  <a href="#" onClick={toggleForm}>
                    Sign in.
                  </a>
                </p>
              </form>
            </div>
            <div className="imgBx">
              <img
                src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img2.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
