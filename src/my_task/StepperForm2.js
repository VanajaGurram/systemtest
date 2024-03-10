import React from 'react'
import { Formik,Form,Field,ErrorMessage, isString } from 'formik'
import * as Yup from 'yup'
 
function StepperForm2() {
  const  initialValues={
        isStepper:1,
        firstName:"",
        lastName:"",
        email:"",
        password:""
    }
  return (
    <div>
        <Formik
        initialValues={initialValues}
        onSubmit={(values)=>{
            console.log(values)
        }}
        validationSchema={Yup.object().shape({
            firstName:Yup.string().when('isStepper',{
                    is:(val)=>val===1,
                    then:(val)=>val.required("required"),
                    otherwise:(val)=>val.notRequired()
                }),
            lastName:Yup.string().required("reqired"),
            email:Yup.string().email("must be in email formate").required("required"),
            password:Yup.string().required("required")
        })}>
            {
                ({form,values,errors,setFieldValue})=>(
                    <Form>
                        {console.log("erooorrr",errors)}
                        {
                   
                            values.isStepper===1&&<div>
                              FirstName:  <Field name='firstName' type='text'></Field>
                              <ErrorMessage name='firstName'></ErrorMessage><br/>
                               LastName:  <Field name='lastName' type='text'></Field>
                               <ErrorMessage name='lastName'></ErrorMessage><br/>
                               <button type='button' onClick={()=>setFieldValue("isStepper",2)}>next</button>
                            </div>
                        }
                        {
                           values.isStepper===2&&<div>
                                Email: <Field name='email' type='email'></Field>
                                <ErrorMessage name='email'></ErrorMessage><br/>
                                password: <Field name='password' type='password'></Field>
                                <ErrorMessage name='password' ></ErrorMessage><br/>
                                <button type='button' onClick={()=>setFieldValue("isStepper",1)}>Back</button>
                                <button type='submit'>Submit</button>
                            </div>
                        }
                    </Form>
                )
            }
        </Formik>
    </div>
  )
}
 
export default StepperForm2
