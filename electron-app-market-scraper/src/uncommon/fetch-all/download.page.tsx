import { Cookie, Files, User } from "lucide-react";
import BasicPageInfo from "src/common/components/composites/basic-page-info";
import Button from "src/common/components/primitives/button";
import RecentActivity from "./recent-activity";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "src/common/components/primitives/card";
import {
  Input,
  InputContainer,
  InputLabel,
} from "src/common/components/primitives/input";
import type { FormEvent } from "react";

const DownloadAllPage = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const steamId = formData.get("steamId");
    const steamCookies = formData.get("cookies");
  };

  return (
    <>
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <InputContainer className="flex-1 min-w-full md:min-w-0 space-y-2">
                <InputLabel htmlFor="steamId">Steam ID / Name / ID</InputLabel>
                <Input
                  name="steamId"
                  type="text"
                  placeholder="Enter your Steam ID, name, or fetch identity"
                  leftIcon={<User size={20} />}
                />
              </InputContainer>
              <InputContainer className="flex-1 min-w-full md:min-w-0 space-y-2">
                <InputLabel htmlFor="cookies">Cookies</InputLabel>
                <Input
                  name="cookies"
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
    </>
  );
};

export default DownloadAllPage;
