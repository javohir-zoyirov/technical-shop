import { useContext, useEffect, useState } from "react";
import ApiContext from "../../context/context";
import {
  Button,
  Card,
  Col,
  Row,
  Typography,
  Modal,
  message,
  Space,
} from "antd";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "./style.css";
import { Header } from "../header";

export const CategotriesPage = () => {
  const [activ, setActivProduct] = useState(1);
  const {
    categoriesData,
    setCategoriesData,
    productData,
    brandData,
    activCategory,
    setActivCategory,
    basket,
    setBasket,
  } = useContext(ApiContext);

  const navigate = useNavigate();

  //modal function

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [items, setItems] = useState({});

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //modal function
  let modalData = productData[activ - 1];
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Mahsulot savatga qo'shildi",
    });
  };

  const addToBasket = (item) => {
    setBasket((prev) => ({
      [item.id]: {
        ...item,
        count: 1,
      },
      ...prev,
    }));
  };

  // useEffect(() => {
  //   setBasket(items);
  // }, [items]);

  return (
    <>
      <Header />
      <section
        style={{ backgroundColor: "var(--background-secondary, #ECF4FF)" }}
      >
        <div className="container mx-auto">
          <Typography className="py-7 text-3xl text-[#1E1E1E]">
            Kategoriyalar
          </Typography>

          <Row className="felx justify-between align-center gap-5 mt-5 p-4">
            {categoriesData.map((item, index) => (
              <Col xs={24} sm={12} md={8} lg={6} xl={4} key={index}>
                <Card
                  bordered={false}
                  className="h-full flex justify-center text-center cursor-pointer shadow"
                  onClick={() => {
                    setActivCategory(categoriesData[index].id);
                    navigate("/products");
                  }}
                >
                  <div className="h-[136px] object-cover flex justify-center items-center">
                    <img src={item.image} className="w-[136px]" alt="Rasm" />
                  </div>
                  <Typography className="text-base text-[#1E1E1E]">
                    {item.categoryName}
                  </Typography>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="bg-[white] text-center mt-4 rounded-[10px]">
            <Typography className="text-lg text-[#1E1E1E] py-3">
              Batafsil
            </Typography>
          </div>
        </div>

        <div className="container mx-auto flex justify-between items-center mt-4 py-4 ">
          <div className="w-[40%] card">
            <img
              src="https://nextstore.uz/cdn/shop/files/2_430x.webp?v=1683541182"
              className="w-full object-cover"
              alt="Rasm"
            />
          </div>
          <div className="w-[40%] card">
            <img
              src="https://nextstore.uz/cdn/shop/files/3_430x.webp?v=1683541202"
              className="w-full object-cover"
              alt="Rasm"
            />
          </div>
        </div>

        <div className="container mx-auto mt-5">
          <Typography className="py-7 text-3xl text-[#1E1E1E]">
            Eng ko'p sotilgan
          </Typography>

          <Row className="felx justify-between gap-5 p-4  ">
            {productData.slice(0, 10).map((item, index) => {
              return (
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  xl={4}
                  key={index}
                  className="mt-8"
                >
                  <Card
                    bordered={false}
                    className="h-full flex flex-col justify-between card cursor-pointer"
                  >
                    <div className="h-[136px] object-cover justify-center flex items-center">
                      <img src={item.image} className="w-[136px]" alt="Rasm" />
                    </div>
                    <div className="text-start">
                      <Typography className="text-blue-600 text-[18px]">
                        {item.price} so'm
                      </Typography>
                      <Typography className="text-[14px] text-[#1E1E1E]">
                        {item.fulName.length > 16
                          ? `${item.fulName.slice(0, 16)} . . .`
                          : item.fulName}
                      </Typography>
                    </div>

                    <div>
                      <Typography className="text-[#6C757D] my-5">
                        {item.order} ta buyurtma
                      </Typography>
                      <div className="flex justify-between align-center">
                        <Button
                          onClick={() => {
                            showModal();
                            setActivProduct(item.id);
                          }}
                          className="bg-blue-500 btn text-white hover:text-white"
                        >
                          Info
                        </Button>
                        {contextHolder}
                        <Button
                          onClick={() => {
                            addToBasket(item);
                            success();
                          }}
                          className="border-0"
                        >
                          <ShoppingCartOutlined
                            className="hover:text-blue-500"
                            style={{ fontSize: "24px" }}
                          />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>

        <div className="container mx-auto py-8 ">
          <Typography className="py-7 text-3xl text-[#1E1E1E]">
            Brendlar
          </Typography>
          <div className="flex flex-wrap justify-center mt-8">
            {brandData.map((item, index) => (
              <div
                key={index}
                className="bg-[#FCFFFC] rounded-xl py-[5px] px-[49px] m-2"
              >
                <img src={item.image} className="w-full h-[90px]" alt="Rasm" />
              </div>
            ))}
          </div>
        </div>

        <Modal
          title="Mahsulot haqida"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <div className="flex gap-5 items-center ">
            <div className="w-1/2">
              <img src={modalData.image} className="w-full" />
            </div>
            <div className="w-1/2">
              <Typography className="text-rose-600 text-xl">
                <span className="fw-bold text-xl text-black">Name : </span>{" "}
                {modalData.fulName}
              </Typography>
              <Typography className="text-amber-500 text-xl">
                <span className="fw-bold text-xl text-black">Brand : </span>
                {modalData.brand}
              </Typography>
              <Typography className="text-amber-500 text-2xl">
                <span className="fw-bold text-black text-xl">Price : </span>
                {modalData.price} <span className="text-black">so'm</span>
              </Typography>
            </div>
          </div>
        </Modal>
      </section>
    </>
  );
};
