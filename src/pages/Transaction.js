import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Row, Col, Typography, QRCode, Tag } from "antd";
import {
  UserOutlined,
  DollarCircleFilled,
  CarOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

import styles from "./Transaction.module.css";
import { getTransaction } from "../client/transactions.client";

const { Text } = Typography;

export default function Transaction() {
  const { vehicleId } = useParams();
  const [transactionData, setTransactionData] = useState("");

  useEffect(() => {
    function fetchTransaction() {
      getTransaction(vehicleId)
        .then((res) => res.json())
        .then(({ data }) => {
          setTransactionData(data);
        });
    }
    fetchTransaction();
  }, [vehicleId]);

  return (
    <div className={styles.container}>
      <Row align="middle">
        <Col flex="50px" span={3}>
          <Avatar size={48} icon={<UserOutlined />} />
        </Col>
        <Col flex="auto" offset={1}>
          <Text
            style={{
              fontSize: "0.8rem",
            }}
            type="secondary"
          >
            Welcome back,
          </Text>

          <Typography.Title
            level={5}
            style={{
              margin: 0,
            }}
          >
            {transactionData.name}
          </Typography.Title>
        </Col>
      </Row>

      <div className={styles.spacing}> </div>

      <Row className={styles.cardBalance}>
        <Col span={16}>
          <Text
            style={{
              fontSize: "0.8rem",
            }}
            type="secondary"
          >
            Total balance
          </Text>
          <Row align="middle">
            <Col
              flex="35px"
              style={{
                marginBottom: "-2px",
              }}
            >
              <DollarCircleFilled
                style={{
                  fontSize: "1.6rem",
                }}
              />
            </Col>
            <Col>
              <Typography.Title
                level={2}
                style={{
                  margin: 0,
                }}
              >
                {transactionData.balance}
              </Typography.Title>
            </Col>
          </Row>
          <div className={styles.spacing}> </div>
          <Text
            style={{
              fontSize: "0.8rem",
            }}
            type="secondary"
          >
            Vehicle Id
          </Text>
          &nbsp;
          <Text keyboard>{transactionData.vehicleId}</Text>
        </Col>
        <Col span={8}>
          <QRCode size="105" value={transactionData.vehicleId} />
        </Col>
      </Row>

      <div className={styles.spacing}> </div>

      <Typography.Title
        level={2}
        style={{
          marginTop: 0,
        }}
      >
        Transactions
      </Typography.Title>
      <div className={styles.transactions}>
        {transactionData &&
          transactionData.transaction.map((tx) => {
            return (
              <Row
                key={tx.id}
                align="top"
                style={{
                  marginBottom: "1.1rem",
                }}
              >
                <Col span={3}>
                  <CarOutlined
                    style={{
                      padding: "1rem",
                      borderRadius: "99999px",
                      backgroundColor: "rgb(235, 246, 255)",
                    }}
                  />
                </Col>
                <Col span={15} offset={1}>
                  <div
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    <div>{transactionData.vehicleType}</div>
                    <div>
                      <Text
                        style={{
                          fontSize: "0.8rem",
                        }}
                        type="secondary"
                      >
                        <CalendarOutlined
                          style={{
                            color: "black",
                          }}
                        />
                        &nbsp;
                        {tx.createdAt.split(" ")[0]}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <ClockCircleOutlined
                          style={{
                            color: "black",
                          }}
                        />
                        {/* &nbsp;{tx.createdAt.split(" ")[1]} */}
                        {(
                          parseInt(tx.createdAt.substring(11, 13)) + 6
                        ).toString() + tx.createdAt.substring(13)}
                        &nbsp;{}
                      </Text>
                    </div>
                  </div>
                </Col>
                <Col
                  style={{
                    display: "flex",
                    justifyContent: "right",
                  }}
                  span={4}
                  offset={1}
                >
                  {tx.paymentStatus === "paid" ? (
                    <Row
                      justify="end"
                      style={{
                        marginLeft: "-0.2rem",
                      }}
                    >
                      <Col
                        style={{
                          marginRight: "-0.5rem",
                        }}
                      >
                        <Tag color="green">{tx.paymentStatus}</Tag>
                      </Col>
                      <Col>
                        <Tag>-{transactionData.tollRate}&nbsp;taka</Tag>
                      </Col>
                    </Row>
                  ) : (
                    <Row justify="end">
                      <Col
                        style={{
                          marginRight: "-0.23rem",
                        }}
                      >
                        <Tag color="error">{tx.paymentStatus}</Tag>
                      </Col>
                    </Row>
                  )}
                </Col>
              </Row>
            );
          })}
      </div>
    </div>
  );
}
