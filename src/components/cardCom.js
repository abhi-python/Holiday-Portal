import React from "react";
import moment from "moment/moment";
import { Card, CardBody, Col } from "reactstrap";

function CardComponent(props) {
  const {cardData}=props||{};
  console.log(cardData.numDays);

  return (
    <Col lg="24">
      <Card className="shadow-lg--hover shadow">
        <CardBody>
          <div className="d-flex px-3">
            <div className="pl-4">
              <p>Total number of days leave</p>
              <h3>{cardData.numDays}</h3>
              <p className="description mt-3">Start Date: {moment(cardData.startDate.$d).format("ddd DD MMM YYYY")}</p>
              <p className="description mt-3">Working Days:</p>
              <p className="description mt-3">Saturday Working: {
                  cardData.saturdayWorking? "Yes": "No"
              }</p>
               <p className="description mt-3">Sunday Working: {
                  cardData.sundayWorking? "Yes": "No"
              }</p>
                <span className="nav-link-inner--text ml-1">
                  {cardData.datesToBeApplied?.length > 0 && <>Applied Dates:</>}
                  {cardData.datesToBeApplied?.length > 0 &&
                    cardData.datesToBeApplied?.map((item, index) => {
                      return (
                        <div key={index}>
                          {moment(item).format("ddd DD MMM YYYY")}
                        </div>
                      );
                    })}
                </span>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
}

export default CardComponent;
