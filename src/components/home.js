import React, {  useState } from "react";
import dayjs from "dayjs";
import Nav from "./nav";
import { useLocation } from "react-router-dom";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, DatePicker, Space, Checkbox } from "antd";
import moment from "moment/moment";
import isWithinInterval from 'date-fns/isWithinInterval';
import addDays from "date-fns/addDays"
import { eachDayOfInterval, format, isSaturday, isSunday } from "date-fns";
import CardComponent from "./cardCom";
import '../style.css'

const Home = () => {
  const { state } = useLocation();
  const [datesToBeApplied,setDatesToBeApplied]=useState([]);
  const [formValues, setValues] = useState([]);
  const [cardData,setCardData]=useState([]);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    // console.log(values);
    // setValues(values);
    if (values.companyHolidays?.length >= 3) {
      let count = 0;
      let endDate = addDays(new Date(values.startDate?.$d?.valueOf()), values.numDays - 1);
      let startDate = new Date(values.startDate?.$d?.valueOf());
      let holidayList = values.companyHolidays.map((item) => {
        return new Date(item?.date.$d?.valueOf())
      })?.map((x) => { return format(x, 'yyyy-MM-dd') });

      let datesToBeApplied=[];
     datesToBeApplied= values.companyHolidays.map((item,index) => {
        if (isWithinInterval(new Date(item?.date.$d?.valueOf()), {
          start: startDate,
          end: endDate
        })) {
          count += 1;
        }
        
        if (count > 0) {
          endDate = addDays(new Date(values.startDate?.$d?.valueOf()), values.numDays - 1 + count);
        }
        const result = eachDayOfInterval({
          start: startDate,
          end: endDate
        })
        let finalDates = result?.map((x) => { return format(x, 'yyyy-MM-dd') })?.filter(res => !holidayList?.includes(res));
        var printDate= finalDates?.filter((x)=>{
          if(values.saturdayWorking && isSaturday(new Date(x.valueOf()))||values.sundayWorking && isSunday(new Date(x.valueOf()))){
            if(holidayList.includes(format(addDays(new Date(x.valueOf()), 1),'yyyy-MM-dd'))){
              return;
            }
            return;
          }
          else return x;
        }) 
        if(printDate.length < values.numDays){
          let arr=[];
          for(var i=1;i<= values.numDays - printDate?.length; i++){
            arr.push(format(addDays(new Date(moment(printDate[printDate.length-1]?.valueOf())), i),'yyyy-MM-dd'))
          }
          // console.log(printDate.concat(arr));
          return printDate.concat(arr);
          // setDatesToBeApplied(printDate.concat(arr))
        }
        
        
       
      })
      setCardData([...cardData,{...values,datesToBeApplied:datesToBeApplied[0]}])
    }
   
  };
  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };
  const onChange = (e, name) => {
    let value = e.target.checked;
    form.setFieldValue(name, value)
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // const validateUsername = (_, value) => {
  //   if (value && value.length < 5) {
  //     return Promise.reject("Username must be at least 5 characters long");
  //   }
  //   return Promise.resolve();
  // };
  // const cardData=[formValues].concat(datesToBeApplied)||[];
  console.log(cardData)
  return (
    <>
      <Nav />
      <h1 className="holiday">Holiday Portal</h1>
      <div className="form-container">
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 10,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: false,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Number of Days:"
            name="numDays"
            rules={[
              {
                required: true,
                message: "Please enter number of days!",
              },
              // { validator: validateUsername },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Start Date:"
            name="startDate"
            rules={[
              {
                required: true,
                message: "Required",
              },
              // { validator: validateUsername },
            ]}
          >
            <DatePicker inputReadOnly format="ddd DD MMM YYYY" disabledDate={disabledDate} />
          </Form.Item>

          <Form.List name="companyHolidays">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      marginBottom: 8,
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      label="Company Holidays:"
                      {...restField}
                      name={[name, "date"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing holidays",
                        },
                      ]}
                    >
                      <DatePicker inputReadOnly format="ddd DD MMM YYYY" disabledDate={disabledDate} />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                    disabled={fields?.length>=10}
                  >
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item name="saturdayWorking">
            <Checkbox onChange={(e) => onChange(e, 'saturdayWorking')}>
              Saturday Working
            </Checkbox>
          </Form.Item>
          <Form.Item name="sundayWorking">
            <Checkbox onChange={(e) => onChange(e, 'sundayWorking')}>
              Sunday Working
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
        {cardData?.map((item,index)=>(
          <CardComponent 
          key={index}
            // formData = {formValues}
            // leaveDates= {datesToBeApplied}
            cardData={item}
          />
        ))}
        {datesToBeApplied?.length> 0 && <>Dates:</>}
        {datesToBeApplied?.length>0 && datesToBeApplied?.map((item,index)=>{
          return <div key ={index}>{moment(item).format("ddd DD MMM YYYY")}</div>
        })}
      </div>
    </>
  );
};

export default Home;
