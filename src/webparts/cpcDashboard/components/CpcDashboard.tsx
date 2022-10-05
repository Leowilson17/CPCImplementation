import * as React from "react";
// import styles from './CpcDashboard.module.scss';
import "../../../ExternalRef/css/style.css";
import { ICpcDashboardProps } from "./ICpcDashboardProps";
import { escape } from "@microsoft/sp-lodash-subset";
import App from "./App";
import { sp } from "@pnp/sp";

export default class CpcDashboard extends React.Component<
  ICpcDashboardProps,
  {}
> {
  constructor(prop: ICpcDashboardProps, state: {}) {
    super(prop);
    sp.setup({
      spfxContext: this.props.context,
    });
  }
  public render(): React.ReactElement<ICpcDashboardProps> {
    // const {
    //   description,
    //   isDarkTheme,
    //   environmentMessage,
    //   hasTeamsContext,
    //   userDisplayName
    // } = this.props;

    return (
      <div>
      <App context={this.props.context} sp={sp} />
      </div>
    );
  }
}
