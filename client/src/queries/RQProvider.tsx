'use client';

import React, { useState } from 'react';
import { QueryClientProvider, QueryClient, HydrationBoundary, DehydratedState } from '@tanstack/react-query';

type Props = {
  children: React.ReactNode;
};

function RQProvider({ children }: Props) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retryOnMount: true,
          refetchOnReconnect: false,
          retry: false,
        },
      },
    })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default RQProvider;
