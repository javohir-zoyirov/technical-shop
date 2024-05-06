import {
  UnorderedListOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import logo from "../categoriesPage/img/Logo.png";
import { Input, Space } from "antd";
import { Button, Card, Col, Row, Typography, Drawer } from "antd";
import { useNavigate } from "react-router-dom";
import { SearchPage } from "../search";
import { useContext, useEffect, useState } from "react";
import ApiContext from "../../context/context";
import { InternalBreadcrumbItem } from "antd/es/breadcrumb/BreadcrumbItem";
import "./header.css";

export const Header = () => {
  const navigate = useNavigate();
  const { searchValue, setSearchValue } = useContext(ApiContext);
  const { Search } = Input;
  const onSearch = (value, _e, info) => {
    setSearchValue(value);
    <SearchPage searchValue={searchValue} />;
    navigate("/search");
  };

  const { basket, setBasket } = useContext(ApiContext);

  const [busketData, setBusketData] = useState([]);

  useEffect(() => {
    const newDataBusket = Object.values(basket);
    setBusketData(newDataBusket);
  }, [basket]);

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  //drawer function

  const plus = (item) => {
    setBasket((prev) => {
      const updatedBasket = {
        ...prev,
        [item.id]: {
          ...prev[item.id],
          count: prev[item.id].count + 1,
        },
      };
      // console.log(updatedBasket, "updatedBasket");
      return updatedBasket;
    });
  };

  const minus = (item) => {
    if (item.count > 0) {
      setBasket((prev) => {
        const updatedBasket = {
          ...prev,
          [item.id]: {
            ...prev[item.id],
            count: prev[item.id].count - 1,
          },
        };
        // console.log(updatedBasket, "updatedBasket");
        return updatedBasket;
      });
    }
  };

  const [updatedBasket, setUpdatedBasket] = useState({});

  useEffect(() => {
    setUpdatedBasket(basket);
  }, [basket]);

  const delet = (id, index) => {
    const updatedBasket = { ...basket };
    delete updatedBasket[id];

    // console.log(updatedBasket, id);

    setBasket(updatedBasket);
  };

  let totalPrice = 0;

  for (const key in basket) {
    if (basket.hasOwnProperty(key)) {
      totalPrice += basket[key].price * basket[key].count;
    }
  }

  return (
    <div className="container flex align-center justify-between p-4 mx-auto">
      <div className="container flex flex-col md:flex-row items-center justify-between p-4 mx-auto">
        <div className="mb-4 md:mb-0">
          <img
            style={{ width: "100px", height: "40px", objectFit: "contain" }}
            src={logo}
            alt="Logo"
          />
        </div>

        <div className="mb-4 md:mb-0 md:mr-4">
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
          />
        </div>

        <div className="flex gap-4 items-center">
          <Button
            style={{
              borderRadius: "50%",
              width: "45px",
              height: "45px",
              background:
                "var(--button-gradient-20, linear-gradient(270deg, rgba(77, 94, 246, 0.20) 0%, rgba(246, 77, 77, 0.20) 100%))",
            }}
          >
            <HeartOutlined />
          </Button>

          <Button
            onClick={showDrawer}
            style={{
              borderRadius: "50%",
              width: "45px",
              height: "45px",
              background:
                "var(--button-gradient-20, linear-gradient(270deg, rgba(77, 94, 246, 0.20) 0%, rgba(246, 77, 77, 0.20) 100%))",
            }}
          >
            <ShoppingCartOutlined />
          </Button>
          <Button
            style={{
              borderRadius: "50%",
              width: "45px",
              height: "45px",
              background:
                "var(--button-gradient-20, linear-gradient(270deg, rgba(77, 94, 246, 0.20) 0%, rgba(246, 77, 77, 0.20) 100%))",
            }}
            onClick={() => {
              navigate("/login");
            }}
          >
            <UserOutlined />
          </Button>
        </div>
      </div>

      <Drawer
        title="Xarid savati"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <div className="basketCard">
          {Object.values(basket)?.map((item, index) => {
            // console.log(item, "item");
            // console.log(Object.values(basket), "basket");
            return (
              <>
                <div className="flex gap-5 items-center   mt-5 rounded-sm">
                  <div className="w-[36%]">
                    <img src={item?.image} className="w-full" />
                  </div>
                  <div className="w-[64%] p-3">
                    <Typography className="text-rose-600 text-xl">
                      <span className="fw-bold text-xl text-black">
                        Name :{" "}
                      </span>{" "}
                      {item?.fulName}
                    </Typography>

                    <Typography className="text-amber-500 text-xl my-4">
                      <span className="fw-bold text-black text-xl">
                        Price :{" "}
                      </span>
                      {item?.price} <span className="text-black">so'm</span>
                    </Typography>

                    <div className="flex items-center gap-5">
                      <Button
                        onClick={() => {
                          minus(item);
                        }}
                      >
                        -
                      </Button>
                      <span>{item?.count}</span>
                      <Button
                        onClick={() => {
                          plus(item);
                        }}
                      >
                        +
                      </Button>
                      <Button
                        onClick={() => {
                          delet(item?.id, index);
                        }}
                        className="bg-blue-500 text-white"
                      >
                        <DeleteOutlined />
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>

        <div className="mx-auto flex flex-col gap-1mt-10 ">
          <Typography className="text-xl text-black  flex items-center justify-center my-8">
            Summa : <span className="text-2xl">{totalPrice} so'm</span>
          </Typography>
          <Button
            onClick={() => {
              navigate("/register");
            }}
            className="bg-blue-500  text-white mx-auto px-20"
          >
            Xariq qilish
          </Button>
        </div>
      </Drawer>
    </div>
  );
};
