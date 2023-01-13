import axios from 'axios';

export const listcategory = async (id) =>
  await axios.get(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/User/Listcategory/"+id )

export const todolistadds = async (id,value) =>
  await axios.post(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/User/Todolistadd/"+id ,value)

export const todolisteditname= async (id,value) =>
  await axios.put(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/User/Todolistedit/Todolisteditname/"+id,value)

export const todolisteditcategory= async (id,value) =>
  await axios.put(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/User/Todolistedit/Todolisteditcategory/"+id,value)

export const todolisteditduedate= async (id,value) =>
  await axios.put(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/User/Todolistedit/Todolisteditduedate/"+id,value)

export const listadds = async (id,value) =>
  await axios.post(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/User/Listadd/"+id ,value)

export const listaddsone = async (id,value) =>
  await axios.post(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/User/Todolistedit/Listaddsone/"+id,value)

export const listdeletesone = async (id) =>
  await axios.delete(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/User/Todolistedit/Listdeleteone/"+id)

export const listeditone = async (id,value) =>
  await axios.put(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/User/Todolistedit/Listeditone/"+id,value)

export const todolistlistchangestatus = async (id,value) =>
  await axios.put(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/User/Todolistadd/Todolistchange/"+id ,value)

export const Listchangestatus = async (id,value) =>
  await axios.put(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/User/Listchange/"+id,value)

export const categortyadd = async (id,value) =>
  await axios.post(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/User/Categoryadd/"+id ,value)

export const categortyeditname = async (id,value) =>
  await axios.put(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/User/Todolistedit/Categoryeditname/"+id ,value)

export const categorydelete = async (id) =>
  await axios.delete(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/User/Todolistedit/Categorydelete/"+id )





  
  export const listusertodolist = async () =>
  await axios.get(process.env.NEXT_PUBLIC_APP_API+ "/auth/User/Listtodolist/todolist")

  export const listusertodolistid = async (id) =>
  await axios.get(process.env.NEXT_PUBLIC_APP_API+ "/auth/User/Listtodolist/"+id)

  export const listusertodolistid2 = async (id) =>
  await axios.get(process.env.NEXT_PUBLIC_APP_API+ "/auth/User/Listtodolist/Todolistlist/"+id)

  export const todlistedit = async (id) =>
  await axios.get(process.env.NEXT_PUBLIC_APP_API+ "/auth/User/Todolistedit/"+id)