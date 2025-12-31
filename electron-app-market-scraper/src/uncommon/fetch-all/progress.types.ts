type FetchProgress = {
  current: number;
  total: number;
  status: string;
  timestamp: number;
  message?: string;
  jobId: string;
};

export type { FetchProgress };
