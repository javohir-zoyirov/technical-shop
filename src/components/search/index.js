import { useContext, useState } from "react";
import ApiContext from "../../context/context";
import { Button, Card, Col, Row, Typography, Modal, message } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Header } from "../header";

export const SearchPage = ({ searchValue }) => {
  const { productData, basket, setBasket } = useContext(ApiContext);
  const navigate = useNavigate();
  const [activ, setActivProduct] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  let modalData = productData[activ - 1];
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Mahsulot savatga tushdi",
      className: "custom-class",
      style: {
        marginTop: "20vh",
      },
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

  return (
    <>
      <Header />
      <div
        className="h-screen"
        style={{ backgroundColor: "var(--background-secondary, #ECF4FF)" }}
      >
        <div className="container mx-auto ">
          <div className="flex items-center gap-5">
            <Button
              onClick={() => {
                navigate("/main");
              }}
            >
              <ArrowLeftOutlined />
            </Button>
            <Typography className="py-7 text-3xl text-[#1E1E1E]">
              Qidiruv bo'yicha natijalar
            </Typography>
          </div>
          <Row className="flex  gap-10">
            {productData.map((item, index) =>
              item.fulName.toLowerCase().includes(searchValue.toLowerCase()) ? (
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  xl={4}
                  key={index}
                  span={4}
                  className="mt-8"
                >
                  <Card
                    bordered={false}
                    className="h-full flex flex-col justify-between card"
                  >
                    <div className="h-[136px] object-cover justify-center flex items-center">
                      <img
                        src={item.image}
                        className="w-[136px]"
                        alt={item.fulName}
                      />
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
                          className="bg-blue-500 btn text-white hover:text-white "
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
              ) : (
                ""
              )
            )}
          </Row>
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
      </div>
    </>
  );
};
