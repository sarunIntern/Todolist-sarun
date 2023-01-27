import axios from 'axios';

export const changerole = async (authentoken,id,value) =>
  await axios.post(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/Admin/Changerole/"+id,value,
  {
    headers: {
      token:authentoken
    }
  }
  )

export const deleteuser = async (authentoken,id) =>
  await axios.delete(process.env.NEXT_PUBLIC_APP_APIIN + "/auth/Admin/Delete/"+id,
  {
    headers: {
      token:authentoken
    }
  }
  )
  
  export const listusertodolist = async (authentoken) =>
  await axios.get(process.env.NEXT_PUBLIC_APP_API+ "/auth/User/Listtodolist/todolist",
  {
    headers: {
      token:authentoken
    }
  }
  )
  export const listusers = async (authentoken) =>
  await axios.get(process.env.NEXT_PUBLIC_APP_APIIN+ "/auth/Admin/Listuser",
  {
    headers: {
      token:authentoken
    }
  }
  )

export const listuserID= async (authentoken,id) =>
  await axios.get(process.env.NEXT_PUBLIC_APP_API+"/auth/Admin/Listuser/"+id,
  {
    headers: {
      token:authentoken
    }
  }
  );