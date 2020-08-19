import React from 'react';
import { useUsersQuery } from '../generated/graphql';

interface Props {}

export const Home: React.FC<Props> = () => {
  const { data, loading } = useUsersQuery({ fetchPolicy: 'network-only' }); // this fetch policy means it's not going to read from the cache

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.users.map((user) => (
        <li key={user.id}>
          {user.email}, {user.id}
        </li>
      ))}
    </div>
  );
};
