import React, { useState, useEffect } from "react";
import Toast from "../../../Alert/Success";
import Swal from "sweetalert2";
import { AiOutlinePlus, AiFillDelete } from "react-icons/ai";
import { listcategory, todolistadds, categortyadd, listadds } from "../../../function/Auth/User";
import { listusertodolistid,listusertodolist } from "../../../function/Auth/User"

function usertodolist(props) {
    const [loading, setLoading] = useState(false);
    console.log(props.posts)
    return (
        <>
            {loading == true ? (
                <div className="loading-page-container">
                    <div className="loading-page">
                        <div id="spinner"></div>
                        <h1 style={{ color: "rgb(30, 109,169)" }}>Loading . . .</h1>
                    </div>
                </div>
            ) : (
                <div className="usertodolist-con">
                    <div className="usertodolist-con-sub">
                        <div className="usertodolist-card ">
                            <div className="usertodolist-card-header">
                                <h1>Create a todolist</h1>
                            </div>
                            <div className="usertodolist-card-content">    
                                    <div className="form-group">
                                        <label className="usertodolist-lable">Todolist name</label>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
            }

export async function getServerSideProps() {
  
    const result = await listusertodolist()
    const user = await result.data
    // const verified = await result.data.verified
    // const admin = await result.data.admin
    return {
        props: {
            posts: user,
        },
    }
}

export default usertodolist

