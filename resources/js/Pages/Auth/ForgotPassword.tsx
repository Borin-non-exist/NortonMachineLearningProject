import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { router, usePage } from "@inertiajs/react";
import { SharedData } from "@/types";


const ForgotPassword: React.FC = () => {

  const page = usePage<SharedData>();
  const user = page.props.auth?.user;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [ConfirmpasswordError, setConfirmPasswordError] = useState("");


  const handleLogin = () => {
    let isValid = true;

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      router.post('/login', {   // send POST request to login
        ConfirmPassword,
        password,
      }, {
        onError: (errors) => {
          // Show errors from Laravel if login fails
          if (errors.password) setPasswordError(errors.password);
          else setPasswordError("");

          if (errors.confirmPassword) setConfirmPasswordError(errors.confirmPassword);
          else setConfirmPasswordError("");
        },
      });
    }
  };}

export default ForgotPassword;