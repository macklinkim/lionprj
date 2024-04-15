'use client'
import { signIn } from 'next-auth/react';
import GoogleButton from 'react-google-button';

export default function LoginGoogle() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1>Login</h1>
      <GoogleButton onClick={() => signIn('google')} />
    </div>
  );
}
