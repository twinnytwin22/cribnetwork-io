import React from "react";
import Panel from "./Panel";

function NotificationsPanel({
  children,
  span,
}: {
  children: React.ReactNode;
  span?: string | number;
}) {
  return (
    <Panel title="Notifications" span={span?.toString()}>
      {children}
    </Panel>
  );
}

export default NotificationsPanel;
