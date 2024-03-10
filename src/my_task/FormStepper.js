import React, { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const FormStepper = () => {
  const [step, setStep] = useState(1);
  const formRefs = {
    step1: useRef(""),
    step2: useRef(""),
    step3: useRef(""),
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    if (step === 3) {
      console.log("Form submitted");
    }
  };

  const handleStepSubmit = (formik, actions) => {
    formik.submitForm().then(() => {
      if (Object.keys(formik.errors).length === 0) {
        nextStep();
      }
      actions.setSubmitting(false);
    });
  };

  return (
    <div>
      <h1>Stepper Form</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {step === 1 && (
              <Formik
                innerRef={formRefs.step1}
                initialValues={{ firstName: "", lastName: "" }}
                validationSchema={Yup.object().shape({
                  firstName: Yup.string().required("First Name is required"),
                  lastName: Yup.string().required("Last Name is required"),
                })}
                onSubmit={(values, actions) => {
                  handleStepSubmit(formRefs.step1.current, actions);
                }}
              >
                {() => (
                  <div>
                    <Field name="firstName" placeholder="First Name" />
                    <ErrorMessage name="firstName" component="div" />
                    <Field name="lastName" placeholder="Last Name" />
                    <ErrorMessage name="lastName" component="div" />
                    <button type="submit">Next</button>
                  </div>
                )}
              </Formik>
            )}
            {step === 2 && (
              <Formik
                innerRef={formRefs.step2}
                initialValues={{ email: "" }}
                validationSchema={Yup.object().shape({
                  email: Yup.string().email("Invalid email").required("Email is required"),
                })}
                onSubmit={(values, actions) => {
                  handleStepSubmit(formRefs.step2.current, actions);
                }}
              >
                {() => (
                  <div>
                    <Field name="email" placeholder="Email" />
                    <ErrorMessage name="email" component="div" />
                    <button type="submit">Next</button>
                    <button onClick={prevStep}>Previous</button>
                  </div>
                )}
              </Formik>
            )}
            {step === 3 && (
              <Formik
                innerRef={formRefs.step3}
                initialValues={{ password: "" }}
                validationSchema={Yup.object().shape({
                  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
                })}
                onSubmit={(values, actions) => {
                  handleStepSubmit(formRefs.step3.current, actions);
                }}
              >
                {() => (
                  <div>
                    <Field type="password" name="password" placeholder="Password" />
                    <ErrorMessage name="password" component="div" />
                    <button type="submit">Submit</button>
                    <button onClick={prevStep}>Previous</button>
                  </div>
                )}
              </Formik>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormStepper;
