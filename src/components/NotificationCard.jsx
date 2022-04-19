import { useEffect, useState } from "react";
import { Card, Heading, TextContainer, DisplayText, TextStyle, Button } from "@shopify/polaris";
import { Toast, useAppBridge } from "@shopify/app-bridge-react";

import { userLoggedInFetch } from "../App";
import { setCustomer } from "@shopify/app-bridge/actions/Cart";

export function NotificationCard() {
  let [registerLoader, setRegisterLoader] = useState(false);
  const [registerResult, setRegisterResults] = useState(false);
  let [removeLoader, setRemoveLoader] = useState(false);
  const [removeResults, setRemoveResults] = useState(false);

  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);

  const handleRegister = async () => {
    setRegisterLoader(true);
    const { shop } = await fetch("/register-shop").then((res) => res.json());
    console.log(shop);
    setRegisterLoader(false);
    setRegisterResults(true);
  };

  const handleDisable = async () => {
    setRemoveLoader(true);
    const { webhooks } = await fetch("/remove-shop").then((res) => res.json());
    console.log(webhooks);
    setRemoveLoader(false);
    setRemoveResults(true);
  };

  const toastMarkup = registerResult && <Toast content="Notifications enabled" onDismiss={() => setRegisterResults(false)} />;
  const toastRemoveMarkup = removeResults && <Toast content="Notifications disabled" onDismiss={() => setRemoveResults(false)} />;

  return (
    <>
      {toastMarkup}
      {toastRemoveMarkup}
      <Card title="Enable email notifications" sectioned>
        <TextContainer spacing="loose">
          <p>Enable email notifications for abandoned carts, It will send email after 10 minutes of adding an item into cart.</p>
          <Button primary loading={registerLoader} onClick={handleRegister}>
            Enable notifications
          </Button>
          <Button primary loading={removeLoader} onClick={handleDisable}>
            Disable notifications
          </Button>
        </TextContainer>
      </Card>
    </>
  );
}
