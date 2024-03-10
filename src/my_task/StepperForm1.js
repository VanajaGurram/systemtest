import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import Select from 'react-select';
import * as Yup from 'yup'
 
 
 
const stateData = [
    {
        stateName: "telangana",
        stateId: 1,
        districtData: [
            {
                districtName: "mulugu",
                districtId: 1,
                citiesData: [
                    { cityName: "pasra", cityId: 1 },
                    { cityName: "govindaropet", cityId: 2 },
                    { cityName: "chalvai", cityId: 3 }
                ]
            },
            {
                districtName: "suryapet",
                districtId: 2,
                citiesData: [
                    { cityName: "nimmikal", cityId: 1 },
                    { cityName: "yelkaram", cityId: 2 },
                    { cityName: "encharla", cityId: 3 }
                ]
            },
            {
                districtName: "warangal",
                districtId: 3,
                citiesData: [
                    { cityName: "kazipet", cityId: 1 },
                    { cityName: "subedhari", cityId: 2 },
                    { cityName: "hanamkonda", cityId: 3 }
                ]
            }
        ]
    },
    {
        stateName: "andrapradesh",
        stateId: 2,
        districtData: [
            {
                districtName: "kakinada",
                districtId: 1,
                citiesData: [
                    { cityName: "kakinada1", cityId: 1 },
                    { cityName: "kakinada2", cityId: 2 },
                    { cityName: "kakinada3", cityId: 3 }
                ]
            },
            {
                districtName: "vijayawada",
                districtId: 2,
                citiesData: [
                    { cityName: "vijayawada1", cityId: 1 },
                    { cityName: "vijayawada2", cityId: 2 },
                    { cityName: "vijayawada3", cityId: 3 }
                ]
            },
            {
                districtName: "gunturu",
                districtId: 3,
                citiesData: [
                    { cityName: "gunturu1", cityId: 1 },
                    { cityName: "gunturu2", cityId: 2 },
                    { cityName: "gunturu3", cityId: 3 }
                ]
            }
        ]
    }
]
 
const StepperForm = () => {
    const [step, setStep] = useState(1);
    const [data, setData] = useState({})
    const [list, setList] = useState([])
    const [check, setCheck] = useState(false)
    // const mapData = list.map((items, index) => ({ ...items, id: index + 1 }))
    // console.log("mappppp", mapData)
 
    const initialValues = {
        id: data?.id || 0,
        firstName: data?.firstName || '',
        lastName: data?.lastName || '',
        userName: data?.userName || "",
        empId: data?.empId || "",
        email: data?.email || '',
        gender: data?.gender || "",
        address: data?.address || "",
        state: data?.state || "",
        distric: data?.distric || "",
        city: data?.city || "",
        technologies: [
            {
                tech: data?.technologies?.[0]?.tech || "",
                rating: data?.technologies?.[0].rating || ""
            }
        ]
    };
 
    const nextStep = () => {
        setStep(step + 1);
    };
 
    const prevStep = () => {
        setStep(step - 1);
    };
 
 
    const handleSubmit = (values, { resetForm }) => {
        // setCheck(!check)
        console.log(values);
        if (!check) {
            setList([...list, { ...values, id: list.length + 1 }])
        }
        else {
            const index = list.findIndex((val, index) => val.id === values.id)
            list.splice(index, 1, values)
            console.log("editttttttttlisttt",list)
            setList(list)
        }
        resetForm()
        setData({
            firstName:"",
            lastName:"",
            userName:"",
            empId:"",
            email:"",
            gender:"",
            address:"",
            state:"",
            district:"",
            city:"",
            technologies:[
                {
                    tech:"",
                    rating:""
                }
            ]
 
        })
    };
   
 
    Yup.addMethod(Yup.array, 'unique', function (message, mapper = a => a) {
        return this.test('unique', message, function (list) {
            return list.length === new Set(list.map(mapper)).size;
        });
    });
    console.log("dattaaaa..", data)
    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={Yup.object().shape({
                    firstName: Yup.string().min(4, "minimum 4 charecters are required").max(30, "maximum 30 charecters are required").required("firstName is required"),
                    lastName: Yup.string().when("firstName", {
                        is: (val) => val?.length > 0,
                        then: (val) => val.required("lastName is required"),
                        otherwise: (val) => val.notRequired()
                    }),
                    userName: Yup.string().min(4, "minimum 4 charecters required").max(30, "maximum 30 charecters required"),
                    empId: Yup.string().max(15, "maximum 15 charecters only").required("required"),
                    email: Yup.string().email("must have email formate").required("email is required"),
                    gender: Yup.string().required("required one"),
                    address:Yup.string().required("required"),
                    technologies: Yup.array()
                        .of(
                            Yup.object().shape({
                                tech: Yup.string().required("reuired")
                                // .test(
                                //             'unique',
                                //             'Only unique values allowed.',
                                //             (value) => value ? value.length === new Set(value)?.size : true)
                        }))
                        .unique('duplicate phone', a => a.tech)
                        .required("Must have friends")
                    .min(3, 'Minimum of 3 friends')
                    // technologies:Yup.array().of(Yup.object().shape({
                    //     tech:Yup.string().required("requireddd").test(
                    //         'unique',
                    //         'Only unique values allowed.',
                    //         (value) => value ? value.length === new Set(value)?.size : true
                    //       )
                    // }))
 
 
                })}
            >
                {({ values, setFieldValue, isSubmitting ,isValid}) => (
                    <Form>
                        {step === 1 && (
                            <div>
                                <h2>Step 1: Primary information</h2>
                                FirstName :  <Field type="text" name="firstName" />
                                <ErrorMessage name='firstName'></ErrorMessage><br />
                                LastName :  <Field type="text" name="lastName" />
                                <ErrorMessage name='lastName'></ErrorMessage><br />
                                UserName :  <Field type='text' name='userName'></Field>
                                <ErrorMessage name='userName'></ErrorMessage><br />
                                EmpId :  <Field type='number' name='empId'></Field>
                                <ErrorMessage name='empId'></ErrorMessage><br />
                                Email :  <Field type='email' name='email'></Field>
                                <ErrorMessage name='email'></ErrorMessage><br />
                                <label>Gender : </label>
                                <Field type="radio" name="gender" value="male"></Field> Male
                                <Field type="radio" name="gender" value="female"></Field> Female
                                <Field type="radio" name="gender" value="other"></Field> Other
                                <ErrorMessage name='gender'></ErrorMessage><br />
                                Address :  <Field as="textarea" name='address' rows="1" cols="30" ></Field><br />
 
                                <Select name='state' value={values.state}
                                    onChange={(opn) => {
                                        console.log("staeeeeopnnnn", opn)
                                        let x = stateData.find((state) => state?.stateId === opn.value)
                                        let y = stateData.find((state) => state?.stateId === opn?.value)?.districtData?.find((dist) => dist?.districtId === opn.value)
                                        setFieldValue('state', opn);
                                        setFieldValue('distric', { value: x?.districtData?.[0]?.districtId, label: x?.districtData?.[0]?.districtName });
                                        setFieldValue('city', { value: y?.citiesData?.[0]?.cityId, label: y?.citiesData?.[0].cityName })
                                    }}
                                    options={stateData.map((state) => ({ value: state.stateId, label: state.stateName }))}>
                                </Select>
                                <Select name="distric" value={values?.distric}
                                    onChange={(opn) => {
                                        let x = stateData.find((state) => state?.stateId === opn?.value)?.districtData?.find((dist) => dist?.districtId === opn?.value)
                                        setFieldValue('distric', opn);
                                        setFieldValue('city', { value: x?.citiesData?.[0]?.cityId, label: x?.citiesData?.[0]?.cityName })
 
                                    }}
                                    options={values.state ?
                                        stateData?.find((state) => state?.stateId === values?.state?.value)
                                            ?.districtData.map((dist) => ({ value: dist?.districtId, label: dist?.districtName })) : ""}>
                                </Select>
                                <Select name="city" value={values.city}
                                    onChange={(opn) => { setFieldValue('city', opn) }}
                                    options={values.distric ?
                                        stateData.find((state) => state?.stateId === values?.state?.value)
                                            ?.districtData?.find((dist) => dist?.districtId === values?.distric?.value)
                                            ?.citiesData?.map((city) => ({ value: city?.cityId, label: city?.cityName })) : ""}>
                                </Select>
 
                                <button type="submit" onClick={nextStep} >Next</button>
 
                            </div>
                        )}
                        {step === 2 && (
                            <div>
                                <h2>Step 2: Tech Information</h2>
                                <div>
                                    <FieldArray name="technologies">
                                        {
                                            (fprops) => {
                                                const { remove, push, form } = fprops
                                                const { values } = form
                                                const { technologies } = values
                                                return (
                                                    technologies.map((techn, index) => (
                                                        <div key={index}>
                                                            <Field type='text' name={`technologies.${index}.tech`}></Field>
                                                            <ErrorMessage name={`technologies.${index}.tech`}></ErrorMessage>
 
                                                            <Field type='text' name={`technologies.${index}.rating`}></Field>
                                                            {
                                                                index > 0 && <button type='button' onClick={() => remove(index)}>Remove</button>
                                                            }
                                                            <button type='button' onClick={() => push({ tech: "", rating: "" })}>Add</button>
                                                        </div>
                                                    ))
                                                )
                                            }
                                        }
                                    </FieldArray>
 
                                    <ErrorMessage name='technologies'></ErrorMessage>
 
                                </div>
                                <button type="button" onClick={prevStep}>Previous</button>
                                <button type="submit" disabled={!isValid}>Submit</button>
                                <div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>FirstName</th>
                                                <th>LastName</th>
                                                <th>UserName</th>
                                                <th>EmpId</th>
                                                <th>Email</th>
                                                <th>Gender</th>
                                                <th>Technologies</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                list?.map((row, index) =>
                                                    <tr key={index}>
 
                                                        <td>{row.firstName}</td>
                                                        <td>{row.lastName}</td>
                                                        <td>{row.userName}</td>
                                                        <td>{row.email}</td>
                                                        <td>{row.empId}</td>
                                                        <td>{row.gender}</td>
                                                        <td>{row.technologies?.map((tc, i) => tc.tech).join(",")}</td>
                                                        <td>
                                                            <button type='button' onClick={() => {
                                                                setData(row)
                                                                setCheck(!check)
                                                            }}>Edit</button>
                                                            <button type='button' onClick={() => { setList(list.filter((val, i) => i !== index)) }}>Delete</button>
                                                        </td>
                                                    </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
 
                        )}
                    </Form>
                )}
 
            </Formik>
 
        </div>
    );
};
 
export default StepperForm;