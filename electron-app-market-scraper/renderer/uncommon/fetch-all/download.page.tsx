import BasicPageInfo from "@renderer/common/components/composites/basic-page-info";
import Button from "@renderer/common/components/primitives/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@renderer/common/components/primitives/card";
import {
  Input,
  InputContainer,
  InputLabel,
} from "@renderer/common/components/primitives/input";
import { AlertTriangle, Cookie, Files, User } from "lucide-react";
import { Form } from "react-router-dom";
import RecentActivity from "./activity-logs/recent-activity";
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
              <InputContainer className="min-w-full flex-1 space-y-2 md:min-w-0">
                <InputLabel htmlFor="steamId">Steam ID / Name / ID</InputLabel>
                <Input
                  id="steamId"
                  name="steamId"
                  type="text"
                  placeholder="Enter your Steam ID, name, or fetch identity"
                  leftIcon={<User size={20} className="shrink-0" />}
                />
              </InputContainer>
              <InputContainer className="min-w-full flex-1 space-y-2 md:min-w-0">
                <InputLabel htmlFor="cookies">Cookies</InputLabel>
                <Input
                  id="cookies"
                  name="cookies"
                  type="password"
                  placeholder="Enter your cookies"
                  leftIcon={<Cookie size={20} className="shrink-0" />}
                />
              </InputContainer>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button disabled={loading} type="submit" className="min-w-30">
                {loading ? "Fetching... " : "Start Fetching"}
              </Button>
              {error && (
                <p className="flex flex-row items-center gap-2 break-all text-destructive">
                  <AlertTriangle size={22} className="shrink-0" />
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
