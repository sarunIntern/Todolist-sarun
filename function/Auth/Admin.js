import axios from 'axios';

export const changerole = async (id,value) =>
  await axios.post(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/Admin/Changerole/"+id,value)

export const deleteuser = async (id) =>
  await axios.post(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/Admin/Delete/"+id)