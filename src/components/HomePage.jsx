import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
} from "@shopify/polaris";
import { ShopCard } from "./ShopCard";
import { Statistics } from "./Statistics";

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
      <Statistics />
    </Page>
  );
}
