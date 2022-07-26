export interface Summary {
    ID:        string;
    Message:   string;
    Global:    Global;
    Countries: Country[];
    Date:      Date;
}

export interface Country {
    ID:             string;
    Country:        string;
    CountryCode:    string;
    Slug:           string;
    NewConfirmed:   number;
    TotalConfirmed: number;
    NewDeaths:      number;
    TotalDeaths:    number;
    NewRecovered:   number;
    TotalRecovered: number;
    Date:           Date;
    Premium:        Premium;
}

export interface Premium {
}

export interface Global {
    NewConfirmed:   number;
    TotalConfirmed: number;
    NewDeaths:      number;
    TotalDeaths:    number;
    NewRecovered:   number;
    TotalRecovered: number;
    Date:           Date;
}