import { useState } from "react";
import Header from "./components/Header";
import AttendModal from "./components/AttendMdoal";

import "./App.css";
import { Button, Checkbox, Collapse, Input, InputNumber } from "antd";
import { _debounce } from "./utils";

const { Panel } = Collapse;

type Attenders = {
  attender: string;
  num: number;
  realNum?: number;
  payNum?: number;
  ispay?: boolean;
};
type Order = {
  user: string;
  type: string;
  price: number;
  realPrice?: number;
  target: string;
  realTarget: number;
  attenders: Attenders[];
};

const CONSTANTS = {
  ISPAY: "ispay",
  REAL_TARGET: "realTarget",
};

function App() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersResult, setOrdersResult] = useState<Order[]>([]);
  const [attendVisible, setAttendVisible] = useState(false);
  const [order, setOrder] = useState<Order>();

  const handleAttend = (item: Order) => {
    setAttendVisible(true);
    setOrder(item);
  };

  const panelHeader = (item: Order, flag?: boolean) => {
    return (
      <div>
        <span>{`${item.type} - ${item.user}`}</span>
        {!flag && (
          <Button style={{ float: "right" }} onClick={() => handleAttend(item)}>
            参与拼单
          </Button>
        )}
      </div>
    );
  };

  const handleResultChange = (
    v: any,
    item: Order,
    subItem: Attenders,
    type?: string
  ) => {
    setOrdersResult((data) => {
      const arr = [...data];
      const i = arr.findIndex((d) => d.type === item.type);
      const i2 = arr[i].attenders.findIndex(
        (a) => a.attender === subItem.attender
      );

      if (type === CONSTANTS.ISPAY) {
        const b = v.target.checked;
        arr[i].attenders[i2].ispay = b;
        arr[i].attenders[i2].payNum = b
          ? Number(item.realPrice) * Number(subItem.realNum)
          : 0;
      } else {
        arr[i].attenders[i2].realNum = v;
      }

      return arr;
    });
  };

  const handleRealPriceChange = (v: number, item: Order, type?: string) => {
    setOrdersResult((data) => {
      const arr = [...data];
      const i = arr.findIndex((d) => d.type === item.type);

      if (type === CONSTANTS.REAL_TARGET) {
        arr[i].realTarget = v;
      } else {
        arr[i].realPrice = v;
      }

      return arr;
    });
  };

  return (
    <div className="App">
      <Header setOrders={setOrders} />
      <section className="app_body">
        <div>
          <h3>已发起拼单</h3>
          <Collapse style={{ width: "48vw" }}>
            {orders.map((item) => {
              return (
                <Panel header={panelHeader(item)} key={item.type}>
                  <p>发起人：{item?.user}</p>
                  <p>类型：{item?.type}</p>
                  <p>单价：{item?.price}</p>
                  <p>
                    实际单价：
                    <InputNumber
                      onChange={_debounce(
                        (v: number) => handleRealPriceChange(v, item),
                        500
                      )}
                    />
                  </p>
                  <p>拼单数量：{item?.target}</p>
                  <p>
                    实际数量：
                    <InputNumber
                      onChange={_debounce(
                        (v: number) =>
                          handleRealPriceChange(v, item, CONSTANTS.REAL_TARGET),
                        500
                      )}
                    />
                  </p>
                </Panel>
              );
            })}
          </Collapse>
        </div>
        <div>
          <h3>拼单结果</h3>
          <Collapse style={{ width: "48vw" }}>
            {ordersResult.map((item) => {
              return (
                <Panel header={panelHeader(item, true)} key={item.type}>
                  <span className="attend_header_span">
                    已拼单数量：
                    {item.attenders.reduce(
                      (pre, cur) => pre + Number(cur.num),
                      0
                    )}
                  </span>
                  <span className="attend_header_span">
                    实际拼单数量：
                    {item.attenders.reduce(
                      (pre, cur) => pre + Number(cur.realNum),
                      0
                    )}
                  </span>
                  <span className="attend_header_span">
                    总应收：
                    {Number(item.realPrice) > 0 &&
                      Number(item.realTarget) > 0 &&
                      Number(item.realPrice) * Number(item.realTarget)}
                  </span>
                  <span className="attend_header_span">
                    实收：
                    {item.attenders.reduce(
                      (pre, cur) => pre + Number(cur.payNum),
                      0
                    )}
                  </span>
                  {item.attenders.map((subItem, i) => {
                    return (
                      <div>
                        <p>
                          <span className="attend_span">{i + 1}.</span>
                          <span className="attend_span">
                            参与者：{subItem?.attender}
                          </span>
                          <span className="attend_span">
                            参与数量：{subItem?.num}
                          </span>
                          <span className="attend_span">
                            实际数量：
                            <InputNumber
                              style={{ width: 80 }}
                              onChange={_debounce(
                                (v: number) =>
                                  handleResultChange(v, item, subItem),
                                500
                              )}
                            />
                          </span>
                          <span className="attend_span">
                            应付：
                            {Number(item.realPrice) > 0 &&
                              Number(subItem.realNum) > 0 &&
                              Number(item.realPrice) * Number(subItem.realNum)}
                          </span>
                          <span className="attend_span">
                            已支付：
                            <Checkbox
                              onChange={(v) =>
                                handleResultChange(
                                  v,
                                  item,
                                  subItem,
                                  CONSTANTS.ISPAY
                                )
                              }
                            />
                          </span>
                        </p>
                      </div>
                    );
                  })}
                </Panel>
              );
            })}
          </Collapse>
        </div>
      </section>
      <AttendModal
        modalVisible={attendVisible}
        setModalVisible={setAttendVisible}
        setOrders={setOrdersResult}
        order={order}
      />
    </div>
  );
}

export default App;
