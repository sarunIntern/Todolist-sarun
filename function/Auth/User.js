import axios from 'axios';

export const listcategory = async (authentoken,id) =>
  await axios.get(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/User/Listcategory/"+id ,
  {
    headers: {
      Token:authentoken
    }
  }
  )

export const todolistadds = async (authentoken,id,value) =>
  await axios.post(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/User/Todolistadd/"+id ,value,
  {
    headers: {
      Token:authentoken
    }
  }
  )

export const todolisteditname= async (authentoken,id,value) =>
  await axios.put(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/User/Todolistedit/Todolisteditname/"+id,value,
  {
    headers: {
      Token:authentoken
    }
  }
  )

export const todolisteditcategory= async (authentoken,id,value) =>
  await axios.put(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/User/Todolistedit/Todolisteditcategory/"+id,value,
  {
    headers: {
      Token:authentoken
    }
  }
  )

export const todolisteditduedate= async (authentoken,id,value) =>
  await axios.put(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/User/Todolistedit/Todolisteditduedate/"+id,value,
  {
    headers: {
      Token:authentoken
    }
  }
  )

export const listadds = async (authentoken,id,value) =>
  await axios.post(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/User/Listadd/"+id ,value,
  {
    headers: {
      Token:authentoken
    }
  }
  )

export const listaddsone = async (authentoken,id,value) =>
  await axios.post(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/User/Todolistedit/Listaddsone/"+id,value,
  {
    headers: {
      Token:authentoken
    }
  }
  )

export const listdeletesone = async (authentoken,id) =>
  await axios.delete(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/User/Todolistedit/Listdeleteone/"+id,
  {
    headers: {
      Token:authentoken
    }
  }
  )

export const listeditone = async (authentoken,id,value) =>
  await axios.put(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/User/Todolistedit/Listeditone/"+id,value,
  {
    headers: {
      Token:authentoken
    }
  }
  )

export const todolistlistchangestatus = async (authentoken,id,value) =>
  await axios.put(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/User/Todolistadd/Todolistchange/"+id ,value,
  {
    headers: {
      Token:authentoken
    }
  }
  )

export const Listchangestatus = async (authentoken,id,value) =>
  await axios.put(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/User/Listchange/"+id,value,
  {
    headers: {
      Token:authentoken
    }
  }
  )

export const categortyadd = async (authentoken,id,value) =>
  await axios.post(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/User/Categoryadd/"+id ,value,
  {
    headers: {
      Token:authentoken
    }
  }
  )

export const categortyeditname = async (authentoken,id,value) =>
  await axios.put(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/User/Todolistedit/Categoryeditname/"+id ,value,
  {
    headers: {
      Token:authentoken
    }
  }
  )
export const categorydelete = async (authentoken,id) =>
  await axios.delete(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/User/Todolistedit/Categorydelete/"+id,
  {
    headers: {
      Token:authentoken
    }
  }
  )

  export const listusertodolist = async (authentoken) =>
  await axios.get(process.env.NEXT_PUBLIC_APP_API+ "/auth/User/Listtodolist/todolist",
  {
    headers: {
      Token:authentoken
    }
  }
  )

  export const listusertodolistid = async (authentoken,id) =>
  await axios.get(process.env.NEXT_PUBLIC_APP_API+ "/auth/User/Listtodolist/"+id,
  {
    headers: {
      Token:authentoken
    }
  }
    );

  export const listusertodolistid2 = async (authentoken,id) =>
  await axios.get(process.env.NEXT_PUBLIC_APP_API+ "/auth/User/Listtodolist/Todolistlist/"+id,
  {
    headers: {
      Token:authentoken
    }
  }
    );

  export const todlistedit = async (authentoken,id) =>
  await axios.get(process.env.NEXT_PUBLIC_APP_API+ "/auth/User/Todolistedit/"+id,
  {
    headers: {
      Token:authentoken
    }
  }
  )