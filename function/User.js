import axios from 'axios';

export const listuser= async () =>
  await axios.get(process.env.NEXT_PUBLIC_APP_API+ "/auth/Admin/Listuser/user")

export const listuserID= async (id) =>
  await axios.get(process.env.NEXT_PUBLIC_APP_API+"/auth/Admin/Listuser/"+id);

// export const listuserByID= async () =>
//   await axios.get(process.env.NEXT_PUBLIC_APP_API + "/user")

//export const listuser= async () =>
 // await axios.get(process.env.NEXT_PUBLIC_APP_API + "/user")