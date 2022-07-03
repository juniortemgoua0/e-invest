import React from "react";
import "./Header.css";
import {RoundedIconCard} from "../RoundedIconCard";

type Props = {
  children: React.ReactNode
}

export function Header({children}: Props): JSX.Element {

  return (
    <div className="mt-4 mx-4 d-flex justify-content-between align-items-center mb-4">
      <div className="fs-3 fw-bold text-black-50 d-flex align-items-center">{children}</div>
      <RoundedIconCard color="white" size={60} isNotification={true}>
        <img src="/img/icon_notification.svg" height="24" width="24" alt=""/>
      </RoundedIconCard>
    </div>
  );
}

export function NotificationIcon(): JSX.Element {
  return (
    <div className="notification rounded-circle bg-white position-relative">
      <img src="/img/icon_notification.svg" height="24" width="24" alt=""/>
      <span className="notification-counter rounded-circle bg-danger"></span>
    </div>
  );
}
