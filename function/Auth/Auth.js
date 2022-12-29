import axios from 'axios';

export const register= async (value) =>
  await axios.post(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/register",value)

export const contact= async (id,value) =>
  await axios.post(process.env.NEXT_PUBLIC_APP_APIIN+ "/auth/email/"+id, value);

export const verifycation= async (id) =>
  await axios.post(process.env.NEXT_PUBLIC_APP_APIIN+ "/auth/verifycation/"+id);

export const login= async (value) =>
  await axios.post(process.env.NEXT_PUBLIC_APP_APIIN+ "/auth/login", value);

export const requesttoken= async () =>
  await axios.get(process.env.NEXT_PUBLIC_APP_APIIN+ "/auth/requesttoken");