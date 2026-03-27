import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { OrganizationProvider } from "../context/organization.context";


const queryClient = new QueryClient();

export const TestWrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <OrganizationProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </OrganizationProvider>
  </QueryClientProvider>
);