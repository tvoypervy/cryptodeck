import { useState } from "react";
import { Form, Input, InputNumber, Select, Button, Card, Result, Descriptions, Typography, message } from "antd";

const { Title } = Typography;
const { Option } = Select;

function Wizard() {
  const [form] = Form.useForm();
  // тут стейт щоб зберегти успішні відправлення
  const [submittedData, setSubmittedData] = useState(null);

  // тут для успішного сабміту
  const onFinish = (values) => {
    console.log("Form data submitted successfully:", values);
    message.success("Form validated and submitted successfully!");
    setSubmittedData(values);
  };

  // тут скидаєм форму
  const handleReset = () => {
    form.resetFields();
    setSubmittedData(null);
  };

  // тут Success state
  if (submittedData) {
    return (
      <Card style={{ maxWidth: 600, margin: "0 auto", borderRadius: 12 }}>
        <Result
          status="success"
          title="Submission Successful!"
          subTitle="All entered data passed full validation checks."
          extra={[
            <Button type="primary" key="reset" onClick={handleReset} size="large">
              Start Over
            </Button>
          ]}
        >
          <div style={{ marginTop: 24 }}>
            <Title level={4} style={{ marginBottom: 16 }}>Submitted User Summary:</Title>
            <Descriptions column={1} bordered size="middle">
              <Descriptions.Item label="Name">{submittedData.name}</Descriptions.Item>
              <Descriptions.Item label="Age">{submittedData.age}</Descriptions.Item>
              <Descriptions.Item label="Email">{submittedData.email}</Descriptions.Item>
              <Descriptions.Item label="Country" style={{ textTransform: "capitalize" }}>
                {submittedData.country}
              </Descriptions.Item>
            </Descriptions>
          </div>
        </Result>
      </Card>
    );
  }

  // тут звичайне відображення форми
  return (
    <Card 
      style={{ maxWidth: 600, margin: "0 auto" }}
      title={<Title level={3} style={{ margin: 0, textAlign: "center" }}>User form</Title>}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please enter your name!" },
            { min: 2, message: "Name must be at least 2 characters long!" }
          ]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          label="Age"
          name="age"
          rules={[
            { required: true, message: "Please enter your age!" },
            {
              type: "number",
              min: 18,
              max: 100,
              message: "Age must be between 18 and 100 years old!"
            }
          ]}
        >
          <InputNumber style={{ width: "100%" }} placeholder="18" min={1} max={150} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Please enter a valid email address!" }
          ]}
        >
          <Input placeholder="example@mail.com" />
        </Form.Item>

        <Form.Item
          label="Country"
          name="country"
          rules={[{ required: true, message: "Please select your country!" }]}
        >
          <Select placeholder="Select your country of residence">
            <Option value="ukraine">Ukraine</Option>
            <Option value="usa">USA</Option>
            <Option value="united kingdom">United Kingdom</Option>
            <Option value="germany">Germany</Option>
            <Option value="poland">Poland</Option>
          </Select>
        </Form.Item>

        <Form.Item style={{ marginTop: 32, marginBottom: 0 }}>
          <Button type="primary" htmlType="submit" size="large" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Wizard;