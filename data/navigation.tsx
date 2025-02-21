import { StackNavigationProp } from "@react-navigation/stack";
import { Configuration } from "../interfaces/config";
import { CompanyProps } from "../interfaces/company";

export type AuthStackParamList = {
  Login: { config: Configuration; ip: string };
  Register: { config: Configuration; ip: string };
  PrimaryUI: { config: Configuration; ip: string; company: CompanyProps };
};

export type LoginScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Login"
>;
