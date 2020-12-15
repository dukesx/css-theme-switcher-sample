import Wrapper from "components/global/wrapper";
import { Typography, Row, Col, Button, Space } from "antd";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { useStoreActions } from "easy-peasy";

export default function Home() {
  const { currentTheme, status } = useThemeSwitcher();
  const setGetStarted = useStoreActions((actions) => actions.setGetStarted);

  return (
    <Wrapper>
      <Row
        justify="center"
        align="middle"
        className="w-full px-6 py-1 mt-10 bg-center bg-contain h-home-xxl xl:py-36 xxl:py-36 lg:py-36 xs:bg-cover xxs:bg-cover xxs:bg-scroll xs:h-screen xxs:h-96 xs:bg-left xxs:bg-center"
        style={{
          backgroundImage: "url(/art.svg)",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
          <div className="flex flex-col w-full text-center">
            <Typography.Title
              level={1}
              className="mb-2 text-5xl font-bold text-center uppercase break-words font-display xxs:text-4xl"
            >
              Welcome To Physiothrive
            </Typography.Title>
            <Typography.Text
              type="secondary"
              className="mx-auto text-base font-medium text-center font-segoe"
            >
              Growing together, united as one, a thriving community of Physical
              Therapists.
            </Typography.Text>

            <Row justify="center" className="mt-8">
              <Space>
                <Button
                  className="font-segoe"
                  type="primary"
                  onClick={() => setGetStarted(true)}
                >
                  Get Started
                </Button>
                <Button className="font-segoe" type="text">
                  Explore
                </Button>
              </Space>
            </Row>
          </div>
        </Col>
      </Row>
    </Wrapper>
  );
}
