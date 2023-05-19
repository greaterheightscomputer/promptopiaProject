'use client';
//we want to authenticate user using google authentication
import { SessionProvider } from 'next-auth/react';

//Provider is an Higher Order Component (HOC) meaning other components are wrapped inside it
const Provider = ({ children, session }) => {
  //children and session are from props

  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
