import { Card, Layout, TextContainer } from "@shopify/polaris";

export function Statistics() {
  let headingStyle = {
    fontSize: "25px",
    textAlign: "center",
    fontWeight: "500",
  };
  let contentStyle = {
    fontSize: "20px",
    textAlign: "center",
    fontWeight: "500",
  };

  return (
    <Layout>
      <Layout.Section oneThird>
        <Card sectioned>
          <TextContainer spacing="loose">
            <p style={headingStyle}>Abandoned Carts</p>
            <p style={contentStyle}>876</p>
          </TextContainer>
        </Card>
      </Layout.Section>
      <Layout.Section oneThird>
        <Card sectioned>
          <TextContainer spacing="loose">
            <p style={headingStyle}>Email Clicks</p>
            <p style={contentStyle}>344</p>
          </TextContainer>
        </Card>
      </Layout.Section>
      <Layout.Section oneThird>
        <Card sectioned>
          <TextContainer spacing="loose">
            <p style={headingStyle}>Recovered Carts</p>
            <p style={contentStyle}>232</p>
          </TextContainer>
        </Card>
      </Layout.Section>
    </Layout>
  );
}
