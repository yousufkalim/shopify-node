import { useEffect, useState } from "react";
import { Card, Layout, TextContainer } from "@shopify/polaris";

export function Statistics({ statistics }) {
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
            <p style={contentStyle}>{statistics.abandoned}</p>
          </TextContainer>
        </Card>
      </Layout.Section>
      <Layout.Section oneThird>
        <Card sectioned>
          <TextContainer spacing="loose">
            <p style={headingStyle}>Email Clicks</p>
            <p style={contentStyle}>{statistics.clicked}</p>
          </TextContainer>
        </Card>
      </Layout.Section>
      <Layout.Section oneThird>
        <Card sectioned>
          <TextContainer spacing="loose">
            <p style={headingStyle}>Recovered Carts</p>
            <p style={contentStyle}>{statistics.recovered}</p>
          </TextContainer>
        </Card>
      </Layout.Section>
    </Layout>
  );
}
