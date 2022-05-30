import { Card, Layout, DataTable } from "@shopify/polaris";

export function Table({ carts, statistics }) {
  const rows = [
    [
      "yousufkalim@outlook.com",
      "iPhone X and 2 others",
      "27/05/2022, 14:54:36",
      "1,000 PKR",
      "Abandoned",
      "2 Emails sent",
    ],
    [
      "john@yahoo.com",
      "MacBook Pro",
      "22/05/2022, 14:54:36",
      "4,999 PKR",
      "Clicked",
      "1 Email sent",
    ],
    [
      "smith@gmail.com",
      "Samsung 32 GB USB",
      "15/05/2022, 14:54:36",
      "100 PKR",
      "Recovered",
      "2 Emails sent",
    ],
  ];

  return (
    <Layout>
      <Layout.Section oneThird>
        <Card sectioned>
          <DataTable
            columnContentTypes={[
              "text",
              "text",
              "text",
              "number",
              "text",
              "text",
            ]}
            headings={[
              "Customer",
              "Items",
              "Abandoned At",
              "Cart Value",
              "Status",
              "Activity",
            ]}
            rows={carts}
            footerContent={`Total ${
              statistics.recovered_value || 0
            } recovered out of ${statistics.total_value || 0}`}
            showTotalsInFooter
          />
        </Card>
      </Layout.Section>
    </Layout>
  );
}
