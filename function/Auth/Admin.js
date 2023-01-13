import axios from 'axios';

export const changerole = async (id,value) =>
  await axios.post(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/Admin/Changerole/"+id,value)

export const deleteuser = async (id) =>
  await axios.delete(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/Admin/Delete/"+id)
  
  export const listusertodolist = async () =>
  await axios.get(process.env.NEXT_PUBLIC_APP_API+ "/auth/User/Listtodolist/todolist")