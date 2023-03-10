export type CepError = {
    erro: string;
};

export type Cep = {
    cep?: string;
    address_type?: string;
    address_name?: string;
    address?: string;
    state?: string;
    district?: string;
    lat?: string;
    lng?: string;
    city?: string;
    city_ibge?: string;
    ddd?: string;
};
