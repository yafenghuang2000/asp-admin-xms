type ParamValue = string | number | null | undefined | boolean | Date;
export interface IParamsType {
  [key: string]: ParamValue | ParamValue[] | IParamsType | IParamsType[];
}

export interface IRequestConfingType {
  url: string;
  params: IParamsType;
}
