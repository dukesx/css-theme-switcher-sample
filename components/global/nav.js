import useDarkMode from "use-dark-mode";
import { Typography, Modal, Row, Col, Button } from "antd";
import { useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

const { Text } = Typography;
const Nav = ({ theme }) => {
  const { enable, disable } = useDarkMode();
  const setGetStarted = useStoreActions((actions) => actions.setGetStarted);
  const getStarted = useStoreState((state) => state.getStarted);
  return (
    <div
      className="flex px-20 py-2 xs:px-2 xxs:px-2"
      style={{
        backgroundColor: theme == "light" ? "white" : "#181818",
        color: theme == "light" ? "#141414" : "white",
      }}
    >
      <div className="ml-4 sm:ml-1 xs:ml-1 xxs:ml-1">
        {theme == "dark" ? (
          <div className="flex">
            <img src="/logo-white-long.svg" width="170px" />
          </div>
        ) : (
          <div className="flex">
            <img src="/logo-dark-long.svg" width="170px" />
          </div>
        )}
      </div>

      <div className="mx-1 mt-2 ml-auto mr-4 leading-6">
        {theme == "dark" ? (
          <i class="ri-sun-line ri-xl" onClick={() => disable()}></i>
        ) : (
          <i class="ri-moon-line ri-xl" onClick={() => enable()}></i>
        )}
      </div>
      <Modal
        visible={getStarted}
        onCancel={() => setGetStarted(false)}
        footer={false}
      >
        <Row
          style={{
            height: 400,
          }}
        >
          <Col span={24}>
            <div className="flex flex-col text-center">
              <Typography.Title
                level={3}
                className="mb-2 font-bold uppercase font-display"
              >
                Let's Get You Started
              </Typography.Title>
              <Typography.Text type="secondary" className="mt-0 font-medium">
                Get started instantly ⚡ using your favorite provider:
              </Typography.Text>

              <Button className="h-12 mx-auto font-medium border-transparent shadow-lg mt-14 w-52 hover:bg-gray-50 dark:hover:bg-dark font-body">
                <div className="flex">
                  <img src="/google.svg" width="15px" className="mt-0" />
                  <Text className="ml-4 leading-relaxed ">
                    Start with Google
                  </Text>
                </div>
              </Button>

              <Button className="h-12 mx-auto mt-6 font-medium border-transparent shadow-lg w-52 hover:bg-gray-50 dark:hover:bg-dark font-body">
                <div className="flex">
                  <img src="/facebook.svg" width="25px" className="mt-0" />
                  <Text className="ml-2 leading-8">Start with Facebook</Text>
                </div>
              </Button>

              <Typography.Text type="secondary" className="mt-20 font-medium">
                By clicking{" "}
                <b className="font-semibold text-gray-500 dark:text-white">
                  Start
                </b>{" "}
                , you hereby agree to our{" "}
                <a className="font-semibold text-gray-500 underline dark:text-white">
                  Terms
                </a>{" "}
                and accept our{" "}
                <a className="font-semibold text-gray-500 underline dark:text-white">
                  Privacy Policy
                </a>
              </Typography.Text>
            </div>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default Nav;
