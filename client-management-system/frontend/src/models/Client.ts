export interface Client {
  Id: number;
  GivenName: string;
  Surname: string;
  DateOfBirth: string;
  PrimaryLanguageId: number;
  SecondaryLanguageId?: number;
  FundingSourceId: number;
}