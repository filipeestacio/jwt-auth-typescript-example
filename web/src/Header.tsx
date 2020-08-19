import React from 'react';
import { Link } from 'react-router-dom';
import { setAccessToken } from './accessToken';
import { useLogoutMutation, useMeQuery } from './generated/graphql';

interface Props {}

export const Header: React.FC<Props> = () => {
  // look into the fetch policies to learn more about what
  // apollo/graphql does automatically for us.
  const { data, loading } = useMeQuery();

  const [logout, { client }] = useLogoutMutation();

  let body: any = null;
  if (loading) {
    body = null;
  } else if (data && data.me) {
    body = <div>You are logged in as {data.me.email}</div>;
  } else {
    body = <div>Not logged in</div>;
  }

  const logoutButton = (
    <button
      onClick={async () => {
        await logout();
        setAccessToken('');
        await client!.resetStore();
      }}
    >
      Logout
    </button>
  );

  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <Link to="/bye">Bye</Link>
      {
        // conditionally renders the logout button
        !loading && data && data.me && logoutButton
      }
      {body}
    </header>
  );
};
