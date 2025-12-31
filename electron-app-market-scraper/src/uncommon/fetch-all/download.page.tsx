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
import { useState, type FormEvent } from "react";

const DownloadAllPage = () => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const formData = new FormData(event.currentTarget);
    const steamId = formData.get("steamId")?.toString();
    const steamCookies = formData.get("cookies")?.toString();
    if (!steamId || !steamCookies) {
      setError("Fill inputs before start fetching.");
      return;
    } else {
      if (error) setError(null);
    }
    window.electronAPI.startFetchingAll(steamId, steamCookies);
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
            <div className="flex flex-wrap gap-4 items-center">
              <Button type="submit">Start Fetching...</Button>
              {error && (
                <p className="text-destructive flex flex-row gap-2 items-center">
                  <AlertTriangle size={22} />
                  {error}
                </p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
      <RecentActivity />
    </>
  );
};

export default DownloadAllPage;
