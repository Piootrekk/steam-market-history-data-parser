import { Cookie, Download, User } from "lucide-react";
import BasicPageWrapper from "src/common/components/base-page-wrapper";
import BasicPageInfo from "src/common/components/basic-page-info";
import Button from "src/common/components/button";
import Card from "src/common/components/card";
import Input from "src/common/components/input";
import RecentActivity from "./recent-activity";

const DownloadPage = () => {
  return (
    <BasicPageWrapper>
      <BasicPageInfo
        name={"Fetch all new data"}
        desc={
          "Fetch the full Steam Market transaction history for the currently account."
        }
        Icon={Download}
      />
      <Card>
        <Card.Header>
          <Card.Title>Steam Credentials</Card.Title>
        </Card.Header>
        <Card.Content>
          <form className="space-y-4">
            <Input.Container>
              <Input.Label htmlFor="steamId">Steam ID / Name / ID</Input.Label>
              <Input
                id="steamId"
                type="text"
                placeholder="Enter your Steam ID, name, or ID"
                leftIcon={<User />}
              />
            </Input.Container>

            <Input.Container>
              <Input.Label htmlFor="cookies">Cookies</Input.Label>
              <Input
                id="cookies"
                type="password"
                placeholder="Enter your cookies"
                leftIcon={<Cookie />}
              />
            </Input.Container>
            <Button type="submit">Start Fetching</Button>
          </form>
        </Card.Content>
      </Card>
      <RecentActivity />
    </BasicPageWrapper>
  );
};

export default DownloadPage;
