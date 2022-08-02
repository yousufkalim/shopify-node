import { useEffect, useState } from 'react';
import { Page, Layout } from '@shopify/polaris';
import { Instructions } from './Instructions';
import { ShopCard } from './ShopCard';
import { Statistics } from './Statistics';
import { Table } from './Table';
import { useAppBridge } from '@shopify/app-bridge-react';
import { userLoggedInFetch } from '../App';

export function HomePage() {
  let [shop, setShop] = useState({});
  let [carts, setCarts] = useState([]);
  let [statistics, setStatistics] = useState([]);
  const [onboarded, setOnboarded] = useState(false);

  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);

  useEffect(() => {
    if (localStorage.getItem('onboarded')) {
      setOnboarded(true);
    }
    getShop();
  }, []);

  const getShop = async () => {
    const { shop, carts, statistics } = await fetch('/api/shops').then((res) => res.json());
    if (shop) {
      setShop(shop);
      setCarts(carts);
      setStatistics(statistics);
    }
  };

  return (
    <Page fullWidth>
      {!onboarded && (
        <div style={{ marginBottom: '20px' }}>
          <Layout>
            <Layout.Section secondary>
              {/* <NotificationCard /> */}
              <Instructions setOnboarded={setOnboarded} />
            </Layout.Section>
          </Layout>
        </div>
      )}
      <div style={{ marginBottom: '20px' }}>
        <Layout>
          <Layout.Section secondary>
            {/* <NotificationCard /> */}
            <ShopCard shop={shop} setShop={setShop} />
          </Layout.Section>
        </Layout>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <Statistics statistics={statistics} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <Table carts={carts} statistics={statistics} />
      </div>
    </Page>
  );
}
