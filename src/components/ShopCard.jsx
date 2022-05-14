import { useEffect, useState } from "react";
import { Card, TextContainer, Button } from "@shopify/polaris";
import { Toast, useAppBridge } from "@shopify/app-bridge-react";

import { userLoggedInFetch } from "../App";

export function ShopCard() {
  let [active, setActive] = useState(false);
  let [registerLoader, setRegisterLoader] = useState(false);
  const [registerResult, setRegisterResults] = useState(false);

  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);

  useEffect(() => {
    getShop();
  }, []);

  const getShop = async () => {
    const { shop } = await fetch("/shop").then((res) => res.json());
    if (shop) {
      setActive(shop.active);
    }
  };

  const handleActive = async () => {
    setRegisterLoader(true);
    setActive(!active);
    const { shop } = await fetch("/shop", {
      method: "PUT",
      body: JSON.stringify({ active: !active }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    setRegisterLoader(false);
    setRegisterResults(true);
  };

  const toastMarkup = registerResult && (
    <Toast
      content={`Notifications ${active ? "enabled" : "disabled"}`}
      onDismiss={() => setRegisterResults(false)}
    />
  );

  return (
    <>
      {toastMarkup}
      <Card title="Enable email notifications" sectioned>
        <TextContainer spacing="loose">
          <p>
            Enable email notifications for abandoned carts, It will send email
            after 10 minutes of adding an item into cart.
          </p>
          <Button
            primary={!active}
            loading={registerLoader}
            onClick={handleActive}
          >
            {active ? "Disable" : "Enable"} notifications
          </Button>
        </TextContainer>
      </Card>
    </>
  );
}
