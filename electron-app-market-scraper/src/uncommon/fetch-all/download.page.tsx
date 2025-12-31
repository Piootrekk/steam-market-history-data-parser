import { AlertTriangle, Cookie, Files, User } from "lucide-react";
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
import { Form } from "react-router-dom";
import { useFetchAllHistoryAction } from "./download.hook";

const DownloadAllPage = () => {
  const { error, loading, logs } = useFetchAllHistoryAction();
  return (
    <>
      <BasicPageInfo
        name={"Fetch all market history"}
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
          <Form method="post" className="space-y-4">
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
            <div className="flex flex-wrap gap-4 items-center">
              <Button disabled={loading} type="submit">
                {loading ? "Fetching... " : "Start Fetching"}
              </Button>
              {error && (
                <p className="text-destructive flex flex-row gap-2 items-center">
                  <AlertTriangle size={22} />
                  {error}
                </p>
              )}
            </div>
          </Form>
        </CardContent>
      </Card>
      <RecentActivity activities={logs} />
    </>
  );
};

export default DownloadAllPage;
