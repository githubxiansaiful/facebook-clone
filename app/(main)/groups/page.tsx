import React from "react";
import { getGroups } from "../../../lib/data";
import { GroupsHubView } from "../../../components/groups/GroupsHubView";

export default async function GroupsPage() {
  const { joinedGroups, discoverGroups } = await getGroups();

  return (
    <GroupsHubView
      joinedGroups={joinedGroups}
      discoverGroups={discoverGroups}
    />
  );
}
