import { Cookie, Files, User } from "lucide-react";
import BasicPageWrapper from "src/common/components/base-page-wrapper";
import BasicPageInfo from "src/common/components/basic-page-info";
import Button from "src/common/components/button";

import RecentActivity from "./recent-activity";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "src/common/components/card";
import { Input, InputContainer, InputLabel } from "src/common/components/input";
import { ScrollArea } from "src/common/components/scroll-area";

const DownloadAllPage = () => {
  return (
    <BasicPageWrapper>
      <ScrollArea className="space-y-6 flex flex-col">
        <BasicPageInfo
          name={"Fetch all user data"}
          desc={
            "Fetch the full Steam Market transaction history for the currently account."
          }
          Icon={Files}
        />
        <Card>
          <CardHeader>
            <CardTitle>Steam Credentials</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <InputContainer className="flex-1 min-w-full md:min-w-0 space-y-2">
                  <InputLabel htmlFor="steamId">
                    Steam ID / Name / ID
                  </InputLabel>
                  <Input
                    id="steamId"
                    type="text"
                    placeholder="Enter your Steam ID, name, or ID"
                    leftIcon={<User size={20} />}
                  />
                </InputContainer>
                <InputContainer className="flex-1 min-w-full md:min-w-0 space-y-2">
                  <InputLabel htmlFor="cookies">Cookies</InputLabel>
                  <Input
                    id="cookies"
                    type="password"
                    placeholder="Enter your cookies"
                    leftIcon={<Cookie size={20} />}
                  />
                </InputContainer>
              </div>
              <Button type="submit">Start Fetching...</Button>
            </form>
          </CardContent>
        </Card>
        <RecentActivity />
      </ScrollArea>
    </BasicPageWrapper>
  );
};

export default DownloadAllPage;
