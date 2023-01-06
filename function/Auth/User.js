import axios from 'axios';

export const listnullcategory = async (id) =>
  await axios.post(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/User/Listcategory/"+id )

export const todolistadds = async (id,value) =>
  await axios.post(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/User/Todolistadd/"+id ,value)
