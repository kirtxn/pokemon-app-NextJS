import { gql, useQuery } from "@apollo/client";
import client from "../../lib/graphql";

const GET_POKEMONS = gql`
  query Pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { first: 10 },
    client,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Pokemons</h1>
      <ul>
        {data.pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <img src={pokemon.image} alt={pokemon.name} />
            <h2>{pokemon.name}</h2>
            <p>Number: {pokemon.number}</p>
            <p>Type: {pokemon.types.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
