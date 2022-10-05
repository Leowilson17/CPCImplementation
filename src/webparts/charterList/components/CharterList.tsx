import * as React from "react";
import styles from "./CharterList.module.scss";
import { ICharterListProps } from "./ICharterListProps";
import { escape } from "@microsoft/sp-lodash-subset";
import "../../../ExternalRef/css/style.css";
import App from "./App";
import { sp } from "@pnp/sp";

export default class CharterList extends React.Component<
  ICharterListProps,
  {}
> {
  constructor(prop: ICharterListProps, state: {}) {
    super(prop);
    sp.setup({
      spfxContext: this.props.context,
    });
  }

  public render(): React.ReactElement<ICharterListProps> {
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
