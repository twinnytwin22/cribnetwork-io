import React from "react";
import Panel from "./Panel";

function NotificationsPanel({
  children,
  span,
  hidden
}: {
  children: React.ReactNode;
  span?: string | number;
  hidden: boolean
}) {
  return  (
    <React.Fragment>
    {!hidden &&
    <Panel title="Notifications" span={span?.toString()}>
      {children}
    </Panel>}
    </React.Fragment>
  );
}

export default NotificationsPanel;
