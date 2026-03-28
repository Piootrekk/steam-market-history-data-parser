import RootPageWrapper from "@renderer/common/components/composites/base-page-wrapper";
import Button from "@renderer/common/components/primitives/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@renderer/common/components/primitives/card";
import { InputContainer } from "@renderer/common/components/primitives/input";
import { Link } from "@renderer/common/components/primitives/navlink";
import { ScrollArea } from "@renderer/common/components/primitives/scroll-area";
import { AlertCircle } from "lucide-react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

type ErrorBoundy = {
  status: number;
  message: string;
  fromRoute?: boolean;
  StringifiedData?: string;
  stack?: string;
};

const DEFAULT_STATUS = 500;
const DEFAULT_MESSAGE = "An unexpected error occurred.";
const IS_DEV = import.meta.env.DEV ?? false;

const onReloadClick = () => {
  location.reload();
};

const getErrorFromRoute = (error: unknown): ErrorBoundy | undefined => {
  if (isRouteErrorResponse(error)) {
    const status = error.status;
    const message = error.statusText;
    const fromRoute = IS_DEV ? true : undefined;
    const StringifiedData = IS_DEV ? JSON.stringify(error.data) : undefined;
    return { status, message, fromRoute, StringifiedData };
  }
};

const getOtherError = (err: unknown): ErrorBoundy => {
  const transfError = transformError(err);
  return {
    status: DEFAULT_STATUS,
    message: transfError.message,
    fromRoute: IS_DEV ? false : undefined,
    stack: IS_DEV ? transfError.stack : undefined,
  };
};

const getError = (error: unknown): ErrorBoundy => {
  const errorFromRoute = getErrorFromRoute(error);
  if (errorFromRoute) {
    return errorFromRoute;
  } else {
    const interalServerError = getOtherError(error);
    return interalServerError;
  }
};

const transformError = (error: unknown) => {
  if (error instanceof Error) return error;
  else return new Error(DEFAULT_MESSAGE);
};

const ErrorPage = () => {
  const error = useRouteError();
  const correctError = getError(error);
  return (
    <div className="flex h-screen bg-background">
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex-1 overflow-auto p-8">
          <RootPageWrapper className="flex items-center justify-center">
            <ScrollArea direction="vertical">
              <Card>
                <CardHeader>
                  <CardTitle className="text-destructive">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-destructive/20 text-destructive">
                        <AlertCircle className="h-8 w-8 shrink-0" />
                      </div>
                      <h1 className="font-bold text-3xl">Error Page</h1>
                    </div>
                  </CardTitle>
                  <CardDescription>Something went wrong....</CardDescription>
                </CardHeader>
                <CardContent>
                  <main className="max-w-2xl space-y-4">
                    <div className="flex flex-wrap gap-4">
                      <InputContainer className="min-w-full flex-1 space-y-2 md:min-w-0">
                        <Button
                          variant="default"
                          className="w-full"
                          onClick={onReloadClick}
                        >
                          Refresh app
                        </Button>
                      </InputContainer>
                      <InputContainer className="min-w-full flex-1 space-y-2 md:min-w-0">
                        <Link to="/" variant="default" className="w-full">
                          Home page
                        </Link>
                      </InputContainer>
                    </div>
                    <h1 className="text-xl">
                      {correctError.message} - {correctError.status}
                    </h1>
                    <p className="flex w-full flex-col overflow-x-auto break-all p-4 lg:break-normal">
                      {correctError.stack && (
                        <code>Stack: {correctError.stack}</code>
                      )}
                      <code>
                        FromRoute: {correctError.fromRoute ? `YES` : `NO`}
                      </code>
                      {correctError.StringifiedData && (
                        <code>Data: {correctError.StringifiedData}</code>
                      )}
                    </p>
                  </main>
                </CardContent>
              </Card>
            </ScrollArea>
          </RootPageWrapper>
        </main>
      </div>
    </div>
  );
};

export default ErrorPage;
