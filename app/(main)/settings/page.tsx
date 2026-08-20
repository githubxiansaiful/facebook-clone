import React from "react";
import { getCurrentUser } from "../../../lib/auth";
import { SettingsView } from "../../../components/settings/SettingsView";

export default async function SettingsPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  return <SettingsView currentUser={currentUser} />;
}
