'use client'

import PrivateRoute from "@/components/PrivateRoute";
import Layout from "../page";

export default function ConfiguracoesLayout({ children }: { children: React.ReactNode }) {
  return (
    <PrivateRoute>
      <Layout>
        {children}
      </Layout>
    </PrivateRoute>
  );
}