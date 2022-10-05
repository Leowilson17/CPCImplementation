declare interface ICpcDashboardWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
}

declare module 'CpcDashboardWebPartStrings' {
  const strings: ICpcDashboardWebPartStrings;
  export = strings;
}
