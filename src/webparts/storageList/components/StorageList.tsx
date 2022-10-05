import * as React from "react";
import styles from "./StorageList.module.scss";
import { IStorageListProps } from "./IStorageListProps";
import { escape } from "@microsoft/sp-lodash-subset";
import "../../../ExternalRef/css/style.css";
import App from "./App";
import { sp } from "@pnp/sp";

export default class StorageList extends React.Component<
  IStorageListProps,
  {}
> {
  constructor(prop: IStorageListProps, state: {}) {
    super(prop);
    sp.setup({
      spfxContext: this.props.context,
    });
  }
  public render(): React.ReactElement<IStorageListProps> {
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
