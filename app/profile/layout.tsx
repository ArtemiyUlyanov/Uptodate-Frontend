'use client';

import ProtectedRoute from "@/app/ProtectedRoute";
import { TopicsProvider } from "@/hooks/useTopics";

const ProfileLayout = ({
    children
}: Readonly<{children: React.ReactNode}>) => {
    return (
        <ProtectedRoute>
            <TopicsProvider>
                {children}
            </TopicsProvider>
        </ProtectedRoute>
    );
  }
  
  export default ProfileLayout;