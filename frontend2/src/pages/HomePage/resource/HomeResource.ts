export interface IGlobal {
  NewConfirmed: number
  TotalConfirmed: number
  NewDeaths: number
  TotalDeaths: number
  NewRecovered: number
  TotalRecovered: number
  Date: Date
}

export interface IPremium {}
export interface ICountry {
  ID: string
  Country: string
  CountryCode: string
  Slug: string
  NewConfirmed: number
  TotalConfirmed: number
  NewDeaths: number
  TotalDeaths: number
  NewRecovered: number
  TotalRecovered: number
  Date: Date
  Premium: IPremium
}

export interface ISummary {
  ID: string
  Message: string
  Global: IGlobal
  Countries: ICountry[]
  Date: Date
}
