import { Page, Layout } from "@shopify/polaris";
import { ShopCard } from "./ShopCard";
import { Statistics } from "./Statistics";
import { Table } from "./Table";

export function HomePage() {
  return (
    <Page fullWidth>
      <div style={{ marginBottom: "20px" }}>
        <Layout>
          <Layout.Section secondary>
            {/* <NotificationCard /> */}
            <ShopCard />
          </Layout.Section>
        </Layout>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <Statistics />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <Table />
      </div>
    </Page>
  );
}
