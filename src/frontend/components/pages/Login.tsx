import * as React from "react";
import * as Yup from "yup";
import { Formik, FormikProps, FormikActions } from "formik";

interface FormValue {
  email: string;
  password: string;
}
interface LoginProps {
  history: any;
}

const loginSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
      .email("email is inValid")
      .required("email is required"),
    password: Yup.string().required("password is required")
  });
};

const Login = ({ history }: LoginProps) => {
  const handleSubmit = async (value: FormValue) => {
    try {
      await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ user: value })
      });
      history.push("/");
    } catch (ex) {
      console.log(ex.message);
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      validationSchema={loginSchema}
      onSubmit={async (value: FormValue, action: FormikActions<FormValue>) => {
        handleSubmit(value);
        action.setSubmitting(false);
      }}
      render={(props: FormikProps<FormValue>) => {
        return <></>;
      }}
    />
  );
};

export default Login;
