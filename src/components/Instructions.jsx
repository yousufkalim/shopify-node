import { Card, TextContainer, Button } from '@shopify/polaris';

export function Instructions({ setOnboarded }) {
  let contentStyle = {
    fontSize: '17px',
    fontWeight: '500',
    marginRight: '10px',
  };

  const handleClick = async () => {
    setTimeout(() => {
      setOnboarded(true);
    }, 400);

    localStorage.setItem('onboarded', true);
  };

  return (
    <Card title="Setup Instructions" sectioned>
      <TextContainer spacing="loose">
        <p>Let's get started by following this guide</p>
        <div>
          <span style={contentStyle}>Step 1 </span>
          <span>Install the app and make sure the "Enable notifications" button is enabled</span>
        </div>
        <div>
          <span style={contentStyle}>Step 2 </span>
          <span>Go to the store setting and click on "Customize" button in "Current theme" section</span>
        </div>
        <div>
          <span style={contentStyle}>Step 3 </span>
          <span>Click on the "Theme settings" option at bottom of the left sidebar</span>
        </div>
        <div>
          <span style={contentStyle}>Step 4 </span>
          <span>Click on the "App embeds" option at top of the right sidebar</span>
        </div>
        <div>
          <span style={contentStyle}>Step 5 </span>
          <span>Make sure the app is enabled</span>
        </div>
        <div>
          <Button primary onClick={handleClick}>
            Let's Go...
          </Button>
        </div>
      </TextContainer>
    </Card>
  );
}
