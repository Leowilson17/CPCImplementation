import * as React from "react";
import styles from "./BusinessCaseList.module.scss";
import { IBusinessCaseListProps } from "./IBusinessCaseListProps";
import { escape } from "@microsoft/sp-lodash-subset";
import App from "./App";
import "../../../ExternalRef/css/style.css";
import { sp } from "@pnp/sp";

export default class BusinessCaseList extends React.Component<
  IBusinessCaseListProps,
  {}
> {
  constructor(prop: IBusinessCaseListProps, state: {}) {
    super(prop);
    sp.setup({
      spfxContext: this.props.context,
    });
  }

  public render(): React.ReactElement<IBusinessCaseListProps> {
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
