import React from "react";
import { Input, message } from "antd";
import { useNavigate } from "react-router-dom";

import { getTransaction } from "../client/transactions.client";
import styles from "./Home.module.css";

export default function Home() {
  const { Search } = Input;
  const navigate = useNavigate();

  const onSearch = (vehicleId) => {
    if (vehicleId) {
      getTransaction(vehicleId)
        .then((res) => res.json())
        .then(({ success, message: msg }) => {
          if (success) {
            message.success(msg);
            navigate(`transactions/${vehicleId}`);
          } else if (!success) {
            message.error(msg);
          } else {
            message.error(msg);
          }
        });
    } else {
      message.error("Please enter vehicle Id");
    }
  };

  return (
    <div className={styles.parent}>
      <div className={styles.child}>
        <div className={styles.title}>SwiftPay</div>
        <Search
          placeholder="Enter vehicle id"
          onSearch={onSearch}
          enterButton="Submit"
          style={{
            width: "100%",
          }}
        />
      </div>
    </div>
  );
}
