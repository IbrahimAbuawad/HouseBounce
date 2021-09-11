import React, { useContext } from "react";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { Auth } from "../../context/AuthContext";
import { Prop } from "../../context/PropContext";

import "./rendercards.css";

//   ownerName
//
//   houseDescription
//
//   salePrice
//
//   location
//
//   size
//
//   reqStatus

function RenderCards(props) {
  const AuthObject = useContext(Auth);
  const PropObject = useContext(Prop);

  console.log(props.renderData, "props.renderData");

  if (AuthObject.role === "user") {
    return props.renderData?.map((item) => (
      <div class="card" style={{ width: "400px" }}>
        <CardHeader
          title={`${item.ownerName} - ${item.location}`}
          subheader={item.size}
        />
        <img
          src="https://www.voro.ca/wp-content/uploads/2019/07/white-modern-house-curved-patio-archway-c0a4a3b3.jpg"
          alt="house"
        />
        <CardContent>
          <Typography variant="body1" color="textSecondary" component="p">
            {`discreption : ${item.houseDescription}`}
          </Typography>
          <CardActions disableSpacing></CardActions>
          <div class="status">
            <Typography variant="body2" color="textSecondary" component="span">
              {`Price ${item.salePrice} $`}
            </Typography>
            {item.reqStatus === "pending" && (
              <Typography
                variant="body2"
                style={{ color: "#1d4db7", fontWeight: "bold" }}
                component="span"
              >
                {`Status : ${item.reqStatus} `}
              </Typography>
            )}
            {item.reqStatus === "rejected" && (
              <Typography
                variant="body2"
                style={{ color: "#d60000", fontWeight: "bold" }}
                component="span"
              >
                {`Status : ${item.reqStatus} `}
              </Typography>
            )}
            {item.reqStatus === "approved" && (
              <Typography
                variant="body2"
                style={{ color: "#16b103", fontWeight: "bold" }}
                component="span"
              >
                {`Status : ${item.reqStatus} `}
              </Typography>
            )}
          </div>
        </CardContent>
      </div>
    ));
  } else {
    return (
      <>
        {props.renderData?.map((item) => (
          <div class="card" style={{ width: "400px" }}>
            <CardHeader
              title={`${item.ownerName} - ${item.location}`}
              subheader={item.size}
            />
            <img
              src="https://www.voro.ca/wp-content/uploads/2019/07/white-modern-house-curved-patio-archway-c0a4a3b3.jpg"
              alt="house"
            />
            <CardContent>
              <Typography variant="body1" color="textSecondary" component="p">
                {`discreption : ${item.houseDescription}`}
              </Typography>
              <CardActions disableSpacing></CardActions>
              <div class="status">
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="span"
                >
                  {`Price ${item.salePrice} $`}
                </Typography>
                {item.reqStatus === "pending" && (
                  <Typography
                    variant="body2"
                    style={{ color: "#1d4db7", fontWeight: "bold" }}
                    component="span"
                  >
                    {`Status : ${item.reqStatus} `}
                  </Typography>
                )}
                {item.reqStatus === "rejected" && (
                  <Typography
                    variant="body2"
                    style={{ color: "#d60000", fontWeight: "bold" }}
                    component="span"
                  >
                    {`Status : ${item.reqStatus} `}
                  </Typography>
                )}
                {item.reqStatus === "approved" && (
                  <Typography
                    variant="body2"
                    style={{ color: "#16b103", fontWeight: "bold" }}
                    component="span"
                  >
                    {`Status : ${item.reqStatus} `}
                  </Typography>
                )}
              </div>
              <div class="changeStatus">
                <button
                  onClick={() => {
                    PropObject.changeStatusApprove(item._id);
                  }}
                  id="apprbtn"
                >
                  Approve
                </button>
                <button
                  onClick={() => {
                    PropObject.changeStatusReject(item._id);
                  }}
                  id="rejectbtn"
                >
                  Reject
                </button>
              </div>
            </CardContent>
          </div>
        ))}
      </>
    );
  }
}

export default RenderCards;
