import axios from 'axios';

export const register= async () =>
  await axios.post(process.env.NEXT_PUBLIC_APP_API + "/controller/register")