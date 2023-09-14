import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLocalStorageState } from "ahooks";
export const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activAdmin, setActivAdmin] = useLocalStorageState("kirish", {
    defaultValue: false,
  });
  const [parol, setParol] = useState("");
  const [login, setLogin] = useState("");

  const submit = () => {
    if (login === "javoh" && parol === "javoh003") {
      setActivAdmin(true);
    }
  };

  useEffect(() => {
    if (activAdmin === true) {
      navigate("/main");
    } else {
      navigate("/login");
    }
  }, [activAdmin]);

  return (
    <>
      <div className=" flex items-center justify-center bg-[#f5f5f5] h-screen">
        <div className="p-4  w-80  bg-white rounded-[12px] ">
          <div className=" p-4">
            <h1 className=" text-[24px] font-semibold">Kirish</h1>
            <Space direction="vertical">
              <label>Log in</label>
              <Input
                onChange={(e) => setLogin(e.target.value)}
                placeholder="javoh"
                className="w-full"
              />
              <label>Parol</label>
              <Input
                onChange={(e) => setParol(e.target.value)}
                placeholder="javoh003"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Space>

            <button
              onClick={() => {
                submit();
              }}
              class=" mt-5  bg-[#2E5BFF] rounded-[6px]  w-60  p-2 text-white"
            >
              Kirish
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
