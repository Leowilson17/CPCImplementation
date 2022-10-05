import * as React from "react";
import styles from "./BusinessCaseForm.module.scss";
import { IBusinessCaseFormProps } from "./IBusinessCaseFormProps";
import { escape } from "@microsoft/sp-lodash-subset";
import App from "./App";
import "../../../ExternalRef/css/style.css";
import { sp } from "@pnp/sp";

export default class BusinessCaseForm extends React.Component<
  IBusinessCaseFormProps,
  {}
> {
  constructor(prop: IBusinessCaseFormProps, state: {}) {
    super(prop);
    sp.setup({
      spfxContext: this.props.context,
    });
  }

  public render(): React.ReactElement<IBusinessCaseFormProps> {
    // const {
    //   description,
    //   isDarkTheme,
    //   environmentMessage,
    //   hasTeamsContext,
    //   userDisplayName,
    // } = this.props;

    return <App context={this.props.context} sp={sp} />;
  }
}
