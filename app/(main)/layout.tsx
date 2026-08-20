import React from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../../lib/auth";
import {
  getNotifications,
  getConversations,
  getOnlineContacts,
  getFriendsHubData,
} from "../../lib/data";
import { Navbar } from "../../components/layout/Navbar";
import { LeftSidebar } from "../../components/layout/LeftSidebar";
import { RightSidebar } from "../../components/layout/RightSidebar";
import { MobileNav } from "../../components/layout/MobileNav";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  const [
    notificationsData,
    conversations,
    onlineContacts,
    friendsData,
  ] = await Promise.all([
    getNotifications(),
    getConversations(),
    getOnlineContacts(),
    getFriendsHubData(),
  ]);

  const pendingRequestsCount = friendsData?.requests?.length || 0;

  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-[#18191a] text-zinc-900 dark:text-zinc-100 flex flex-col font-sans">
      {/* Top Fixed Header */}
      <Navbar
        currentUser={currentUser}
        notifications={notificationsData.notifications}
        unreadNotificationsCount={notificationsData.unreadCount}
        conversations={conversations}
        pendingRequestsCount={pendingRequestsCount}
      />

      {/* Main Responsive 3-Column Shell */}
      <div className="flex-1 flex justify-between max-w-[1445px] w-full mx-auto pb-14 md:pb-0">
        {/* Left Sidebar */}
        <LeftSidebar
          currentUser={currentUser}
          pendingRequestsCount={pendingRequestsCount}
        />

        {/* Center Main Content Area */}
        <main className="flex-1 min-w-0 max-w-2xl px-2 sm:px-4 py-4 mx-auto">
          {children}
        </main>

        {/* Right Sidebar */}
        <RightSidebar
          contacts={onlineContacts}
          currentUserId={currentUser.id}
        />
      </div>

      {/* Bottom Mobile Navigation */}
      <MobileNav
        unreadNotificationsCount={notificationsData.unreadCount}
        pendingRequestsCount={pendingRequestsCount}
      />
    </div>
  );
}
