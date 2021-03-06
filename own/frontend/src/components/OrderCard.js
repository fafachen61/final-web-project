import React from "react";
import { useDispatch } from "react-redux";

//m-ui
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import makeStyles from "@material-ui/core/styles/makeStyles";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import SummaryExpansion from "./FilterExpansion";
import { changeOrderStatus } from "../redux/actions/dataActions";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  para: {
    fontSize: "x-large",
    marginLeft: "32%",
  },
  title: {
    margin: "20px 0px 10px 260px",
    display: "inline-block",
    marginRight: "40%",
  },
  spaceTypo: {
    display: "flex",
    justifyContent: "space-between",
  },
  address: {
    "& > *": {
      margin: theme.spacing(4),
      width: "25ch",
    },
  },
  red: {
    color: "red",
  },
  green: {
    color: "green",
  },
  buttonCancel: {
    backgroundColor: "#cf0700",
    color: "white",
    marginBottom: 20,
    marginTop: 10,
    marginRight: 10,
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
    "&:disabled": {
      backgroundColor: "#5a5c5a",
      color: "white",
    },
  },
  buttonAccept: {
    backgroundColor: "#118a27",
    color: "white",
    marginBottom: 20,
    marginTop: 10,
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
  },
}));

const OrderCard = (props) => {
  const order = props.order;
  const bookingPriority = order.bookingPriority;
  console.log(order)
  console.log(bookingPriority)
  const role = props.role;
  const classes = useStyles();
  dayjs.extend(relativeTime);
  const dispatch = useDispatch();

  const handleCancel = () => {
    const body = {
      status: "Cancelled",
      //bookingPriority: bookingPriority 
    };
    dispatch(changeOrderStatus(order._id, body));
  };

  const handleAccept = () => {
    const body = {
      status: "Accepted",
      bookingPriority: bookingPriority
    };
    dispatch(changeOrderStatus(order._id, body));
  };

  const handleDelivery = () => {
    const body = {
      status: "Out For Delivery",
      bookingPriority: bookingPriority
    };
    dispatch(changeOrderStatus(order._id, body));
  };

  const handleCompleted = () => {
    const body = {
      status: "Completed",
      bookingPriority: bookingPriority
    };
    dispatch(changeOrderStatus(order._id, body));
  };

  return (
    <Paper
      style={{
        backgroundColor: "#faf7f7",
        marginRight: 20,
        marginBottom: 20,
      }}
      elevation={4}
    >
      <div style={{ marginLeft: 20 }}>
        <Typography gutterBottom variant="body1" color="textSecondary">
          OrderId - #{order._id}
        </Typography>
        <Typography>
          {role === "ROLE_SELLER" && `訂位優先順序: ${bookingPriority}`}
        </Typography>
        {role === "ROLE_USER" &&  order.status !== "Placed"  && order.status !=="Cancelled" &&
        (<Typography gutterBottom variant="body1" color="textPrimary">
          訂位優先順序: {order.bookingPriority} 
        </Typography>)}
        <Typography gutterBottom variant="body1" color="textPrimary">
          {role === "ROLE_USER" && `訂位餐廳 - ${order.seller.name}`}
          {role === "ROLE_SELLER" &&
            `訂位大名 - ${order.user.name}, +886 ${order.user.address.phoneNo}`}
        </Typography>
        {role === "ROLE_USER" && (
          <Typography gutterBottom variant="body1" color="textPrimary">
            Call - +886 {order.seller.phone}
          </Typography>
        )}
        <Typography gutterBottom variant="body1" color="textPrimary">
            訂位時間:{order.bookingTime}
        </Typography>
        <Typography gutterBottom variant="body1" color="textPrimary">
            訂位人數:{order.bookingNumbers}
        </Typography> 
        {/* {role === "ROLE_SELLER" && (
          <Typography gutterBottom variant="body1" color="textPrimary">
            Address -{" "}
            {
              order.user.address.aptName + ", " + order.user.address.locality
              // (`${order.user.address.aptName}, ${order.user.address.locality}`,
              // `${order.user.address.street}`)
            }
          </Typography>
        )} */}
        <div style={{ margin: "10px 20px 10px 0px" }}>
          <SummaryExpansion condition="Orders" items={order.items} />
        </div>
        <Typography gutterBottom variant="body1" color="textPrimary">
          Reserved - {dayjs(order.createdAt).fromNow()}
        </Typography>
          
        <div style={{ display: "flex", flexDirection: "row" }}>
          <FiberManualRecordIcon
            disabled
            className={
              order.status === "Cancelled" ? classes.red : classes.green
            }
          />
          <Typography gutterBottom variant="body1" color="textPrimary">
            Reservaton {order.status} 
          </Typography>
        </div>
        {role === "ROLE_USER" && order.status === "Placed" && (
          <Button
            className={classes.buttonCancel}
            onClick={handleCancel}
            disabled={order.status !== "Placed"}
          >
            Cancel Reservation
          </Button>
        )}
        {role === "ROLE_SELLER" && order.status === "Placed" && (
          <>
            <div style={{ display: "inline-block" }}>
              <Button className={classes.buttonCancel} onClick={handleCancel}>
                Cancel Reservation
              </Button>
              <Button className={classes.buttonAccept} onClick={handleAccept}>
                Accept Reservation
              </Button>
            </div>
          </>
        )}
        {role === "ROLE_SELLER" && order.status === "Accepted" && (
          <Button className={classes.buttonAccept} onClick={handleCompleted}>
            Reservation Completed
          </Button>
        )}
        <br />
      </div>
    </Paper>
  );
};

export default OrderCard;
