import { useEffect, useState } from "react";
import { Card, TextContainer, Button } from "@shopify/polaris";
import { Toast, useAppBridge } from "@shopify/app-bridge-react";

import { userLoggedInFetch } from "../App";

export function ShopCard({ shop, setShop }) {
  let [registerLoader, setRegisterLoader] = useState(false);
  const [registerResult, setRegisterResults] = useState(false);

  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);

  const handleActive = async () => {
    setRegisterLoader(true);
    setShop({ ...shop, active: !shop.active });
    await fetch("/shop", {
      method: "PUT",
      body: JSON.stringify({ active: !shop.active }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    setRegisterLoader(false);
    setRegisterResults(true);
  };

  const toastMarkup = registerResult && (
    <Toast
      content={`Notifications ${shop.active ? "enabled" : "disabled"}`}
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
            primary={!shop.active}
            loading={registerLoader}
            onClick={handleActive}
          >
            {shop.active ? "Disable" : "Enable"} notifications
          </Button>
        </TextContainer>
      </Card>
    </>
  );
}
