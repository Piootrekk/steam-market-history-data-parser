import { AlertCircle } from "lucide-react";
import BasicPageWrapper from "src/common/components/composites/base-page-wrapper";
import Button from "src/common/components/primitives/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "src/common/components/primitives/card";
import { Link } from "src/common/components/primitives/navlink";
import { isRouteErrorResponse, useRouteError } from "react-router";
import { InputContainer } from "src/common/components/primitives/input";
import { ScrollAreaContainer } from "src/common/components/primitives/scroll-area";

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
    <BasicPageWrapper className="flex min-h-screen items-center justify-center">
      <Card className="mx-6">
        <ScrollAreaContainer direction={"vertical"}>
          <CardHeader>
            <CardTitle className="text-destructive">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg  text-destructive border-destructive/20 flex items-center justify-center shrink-0">
                  <AlertCircle className="h-8 w-8 shrink-0" />
                </div>
                <h1 className="text-3xl font-bold">Error Page</h1>
              </div>
            </CardTitle>
            <CardDescription>Something went wrong....</CardDescription>
          </CardHeader>
          <CardContent>
            <main className="space-y-4 max-w-2xl">
              <div className="flex flex-wrap gap-4">
                <InputContainer className="flex-1 min-w-full md:min-w-0 space-y-2">
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={onReloadClick}
                  >
                    Refresh app
                  </Button>
                </InputContainer>
                <InputContainer className="flex-1 min-w-full md:min-w-0 space-y-2">
                  <Link to="/" variant="default" className="w-full">
                    Home page
                  </Link>
                </InputContainer>
              </div>
              <h1 className="text-xl">
                {correctError.message} - {correctError.status}
              </h1>
              <p className="w-full break-all lg:break-normal flex flex-col p-4 overflow-x-auto">
                {correctError.stack && <code>Stack: {correctError.stack}</code>}
                <code>FromRoute: {correctError.fromRoute ? `YES` : `NO`}</code>
                {correctError.StringifiedData && (
                  <code>Data: {correctError.StringifiedData}</code>
                )}
              </p>
            </main>
          </CardContent>
        </ScrollAreaContainer>
      </Card>
    </BasicPageWrapper>
  );
};

export default ErrorPage;
