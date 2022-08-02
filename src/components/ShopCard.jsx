import { useEffect, useState } from 'react';
import { Card, TextContainer, Button } from '@shopify/polaris';
import { Toast, useAppBridge } from '@shopify/app-bridge-react';

import { userLoggedInFetch } from '../App';

export function ShopCard({ shop, setShop }) {
  let [registerLoader, setRegisterLoader] = useState(false);
  const [registerResult, setRegisterResults] = useState(false);

  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);

  const handleActive = async () => {
    setRegisterLoader(true);
    setShop({ ...shop, active: !shop.active });
    await fetch('/shop', {
      method: 'PUT',
      body: JSON.stringify({ active: !shop.active }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
    setRegisterLoader(false);
    setRegisterResults(true);
  };

  const toastMarkup = registerResult && (
    <Toast content={`Notifications ${shop.active ? 'enabled' : 'disabled'}`} onDismiss={() => setRegisterResults(false)} />
  );

  return (
    <>
      {toastMarkup}
      <Card title="Notifications" sectioned>
        <TextContainer spacing="loose">
          <div>
            <p>
              This application allows you to monitor all the abandoned carts in your Shopify e-commerce website, and send a
              reminder.
            </p>
            <p>
              An Abandoned cart is defined in the following way
              <ul>
                <li>A user has added an item in his cart</li>
                <li>The item is still in the cart after 10 minutes</li>
              </ul>
            </p>
            <p>
              By turning on the E-mail notification, you will be sending an e-mail reminder to the users having an abandoned cart
              for completing their purchase.
            </p>
            <p>The e-mail will be sent after 10 minutes.</p>
          </div>
          <Button primary={!shop.active} loading={registerLoader} onClick={handleActive}>
            {shop.active ? 'Disable' : 'Enable'} notifications
          </Button>
        </TextContainer>
      </Card>
    </>
  );
}
