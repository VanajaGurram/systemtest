import React from "react";
import { Formik, Form, Field } from "formik";
import Select from "react-select";
 
function DropDownState() {
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
                        // { cityName: "govindaropet", cityId: 2 },
                        // { cityName: "chalvai", cityId: 3 }
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
                        // { cityName: "subedhari", cityId: 2 },
                        // { cityName: "hanamkonda", cityId: 3 }
                    ]
                }
            ]
        },
        {
            stateName: "andrapradesh",
            stateId: 2,
            districtData: [
                // {
                //     districtName: "kakinada",
                //     districtId: 1,
                //     citiesData: [
                //         { cityName: "kakinada1", cityId: 1 },
                //         { cityName: "kakinada2", cityId: 2 },
                //         { cityName: "kakinada3", cityId: 3 }
                //     ]
                // },
                {
                    districtName: "vijayawada",
                    districtId: 2,
                    citiesData: [
                        { cityName: "vijayawada1", cityId: 1 },
                        { cityName: "vijayawada2", cityId: 2 },
                        { cityName: "vijayawada3", cityId: 3 }
                    ]
                }
                // {
                //     districtName: "gunturu",
                //     districtId: 3,
                //     citiesData: [
                //         { cityName: "gunturu1", cityId: 1 },
                //         { cityName: "gunturu2", cityId: 2 },
                //         { cityName: "gunturu3", cityId: 3 }
                //     ]
                // }
            ]
        }
    ]
    const initialValues = {
        state: "",
        distric: "",
        state: ""
    }
    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    console.log(values)
                }}>
                {
                    ({values,setFieldValue})=>(
                        <Form>
                    <Select name='state' value={values.state}
                        onChange={(opn) => {
                            let x = stateData.find((state) => state?.stateId === opn.value)
                            console.log("staeeeeopnnnn", {opn,x})

                            // let y = stateData.find((state) => state?.stateId === opn?.value)?.districtData?.find((dist) => dist?.districtId === opn.value)
                            setFieldValue('state', opn);
                            if(x.districtData.length===1){

                                setFieldValue('distric', { value: x?.districtData?.[0]?.districtId, label: x?.districtData?.[0]?.districtName });
                            }
                            else{
                                setFieldValue("distric","")
                            }
                            setFieldValue('city', "")
                        }}
                        options={stateData.map((state) => ({ value: state.stateId, label: state.stateName }))}>
                    </Select>
                    <Select name="distric" value={values?.distric}
                        onChange={(opn) => {
 
                            let x = stateData.find((state) => state?.stateId === opn?.value)?.districtData?.find((dist) => dist?.districtId === opn?.value)
                            console.log("distttttttt", { opn, x })
                            setFieldValue('distric', opn);
                            if(x.citiesData.length===1){

                                setFieldValue('city', { value: x?.citiesData?.[0]?.cityId, label: x?.citiesData?.[0]?.cityName })
                            }
                            else{
                                setFieldValue("city","")
                            }
 
                        }}
                        options={values.state ?
                            stateData?.find((state) => state?.stateId === values?.state?.value)
                                ?.districtData?.map((dist) => ({ value: dist?.districtId, label: dist?.districtName })) : ""}>
                    </Select>
                    <Select name="city" value={values.city}
                        onChange={(opn) => { setFieldValue('city', opn) }}
                        options={values.distric ?
                            stateData.find((state) => state?.stateId === values?.state?.value)
                                ?.districtData?.find((dist) => dist?.districtId === values?.distric?.value)
                                ?.citiesData?.map((city) => ({ value: city?.cityId, label: city?.cityName })) : ""}>
                    </Select>
                </Form>
                    )
                }
 
            </Formik>
 
        </div>
    )
}
export default DropDownState;