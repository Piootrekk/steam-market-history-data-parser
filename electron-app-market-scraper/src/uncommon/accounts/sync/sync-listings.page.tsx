import { AlertTriangle, Cookie } from "lucide-react";
import { Form } from "react-router-dom";
import Button from "src/common/components/primitives/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "src/common/components/primitives/card";
import {
  InputContainer,
  InputLabel,
  Input,
} from "src/common/components/primitives/input";
import { useSyncAction } from "./sync-listings.hook";
import RecentActivity from "src/uncommon/fetch-all/activity-logs/recent-activity";

const SyncListingsPage = () => {
  const { logs, error, loading } = useSyncAction();
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Steam Credentials</CardTitle>
          <CardDescription>
            Please make sure that the cookies being entered belong to this
            account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="post" className="space-y-4">
            <InputContainer>
              <InputLabel htmlFor="cookies">Cookies</InputLabel>
              <Input
                name="cookies"
                type="password"
                placeholder="Enter your cookies"
                leftIcon={<Cookie size={20} className="shrink-0" />}
              />
            </InputContainer>
            <div className="flex flex-wrap gap-4 items-center">
              <Button disabled={loading} type="submit" className="min-w-30">
                {loading ? "Fetching... " : "Start Fetching"}
              </Button>
              {error && (
                <p className="text-destructive flex flex-row gap-2 break-all items-center">
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

export default SyncListingsPage;
