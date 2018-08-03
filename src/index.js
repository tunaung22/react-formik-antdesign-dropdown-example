import React from "react";
import ReactDOM from "react-dom";
import { Button, Select, Input, Form } from "antd";
import { withFormik, Form as FormikForm, Field as FormikField } from "formik";

import "./styles.css";

const FormItem = Form.Item;
const Option = Select.Option;

const InnerForm = ({
  props,
  values,
  errors,
  touched,
  setFieldTouched,
  setFieldValue,
  isSubmitting,
  handleSubmit
}) => {
  return (
    <FormikForm onSubmit={handleSubmit}>
      <FormItem>
        <FormikField
          name="username"
          render={({ field }) => <Input {...field} placeholder="Username" />}
        />
      </FormItem>
      <FormItem>
        <FormikField
          name="fruit"
          render={({ field }) => (
            <Select
              {...field}
              onChange={value => setFieldValue("fruit", value)}
              onBlur={() => setFieldTouched("fruit", true)}
              value={values.fruit}
            >
              <Option key={1} value="Apple">
                Apple
              </Option>
              <Option key={2} value="Orange">
                Orange
              </Option>
              <Option key={3} value="Mango">
                Mango
              </Option>
              <Option key={4} value="Pineapple">
                Pineapple
              </Option>
            </Select>
          )}
        />
      </FormItem>
      <FormItem>
        <Button htmlType="submit" type="primary" disabled={isSubmitting}>
          Submit
        </Button>
      </FormItem>
    </FormikForm>
  );
};

const MyFormikForm = withFormik({
  mapPropsToValues({ username, fruit }) {
    return {
      username: username || "",
      fruit: fruit || ""
    };
  },
  // validationSchema: yup.object().shape({
  // username: yup.string().required('Username is required'),
  // }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    setTimeout(() => {
      console.log("Form values", values);
      // save
      setSubmitting(false);
    }, 2000);
  }
})(InnerForm);

function App() {
  return (
    <div className="App">
      <h3>Chose a fruit</h3>
      <MyFormikForm />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
