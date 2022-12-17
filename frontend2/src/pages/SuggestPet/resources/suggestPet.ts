export interface ISuggestPet {
    edad: number;
    vivienda: string;
    sexo: string;
    estadoCivil: string;
    estrato: number;
}

export interface ISuggestPetError {
    edad: string;
    vivienda: string;
    sexo: string;
    estadoCivil: string;
    estrato: string;
}

export const SuggestPetDefault = {
    edad: 0,
    vivienda: "",
    sexo: "",
    estadoCivil: "",
    estrato: 0,
}


export const SuggestPetErrorDefault = {
    edad: "",
    vivienda: "",
    sexo: "",
    estadoCivil: "",
    estrato: "",
}
export const sizeHome = [   {
    value: '',
    label: 'seleccionar',
  },
  {
    value: 'apartamento',
    label: 'apartamento',
  },
  {
    value: 'casa',
    label: 'casa',
  },
  {
    value: 'finca',
    label: 'finca',
  }
]

export const sexoAdop = [   {
    value: '',
    label: 'seleccionar',
  },
  {
    value: 'M',
    label: 'Masculino',
  },
  {
    value: 'F',
    label: 'Femenino',
  }
]

export const estadoCivilData = [   {
    value: '',
    label: 'seleccionar',
  },
  {
    value: 'casado',
    label: 'casado',
  },
  {
    value: 'soltero',
    label: 'soltero',
  },
  {
    value: 'divorciado',
    label: 'divorciado',
  },
  {
    value: 'viudo',
    label: 'viudo',
  }
]

export const estrato = [   {
    value: '0',
    label: 'seleccionar',
  },
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '4',
    label: '4',
  },
  {
    value: '5',
    label: '5',
  }
]

