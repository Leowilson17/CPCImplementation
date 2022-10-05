import * as React from "react";
import styles from "./Calendar.module.scss";
import { ICalendarProps } from "./ICalendarProps";
import { escape } from "@microsoft/sp-lodash-subset";
import "../../../ExternalRef/css/style.css";
import App from "./App";
import { sp } from "@pnp/sp";


export default class Calendar extends React.Component<ICalendarProps, {}> {
  constructor(prop: ICalendarProps, state: {}) {
    super(prop);
    sp.setup({
      spfxContext: this.props.context,
    });
  }

  public render(): React.ReactElement<ICalendarProps> {
    // const {
    //   description,
    //   isDarkTheme,
    //   environmentMessage,
    //   hasTeamsContext,
    //   userDisplayName
    // } = this.props;

    return <App context={this.props.context} sp={sp} />;
  }
}
