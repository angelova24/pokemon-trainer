export interface Pokemon {
    name: string;
    url: string;
}

export interface PokemonResponse {
    count: number;
    next: string;
    previous: string;
    results: Pokemon[];
}
// Creating interfaces to handle the data from API better