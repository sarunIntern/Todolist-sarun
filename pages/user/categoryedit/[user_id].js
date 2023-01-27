import React, { useState, useEffect } from "react";
import Toast from "../../../Alert/Success";
import Confirm from "../../../Alert/Confirm"
import Swal from "sweetalert2";
import { deletecategory, listcategory } from '../../../function/Auth/User'
import { requesttokens } from '../../../function/Auth/Auth'
import { categortyadd, categortyeditname } from "../../../function/Auth/User";
import { AiOutlinePlus, AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useRouter } from "next/router";
function Categorydelete(props) {
    console.log(props)
    const router = useRouter()
    const [loading, setLoading] = useState(true);
    const [catfk, setCatfk] = useState({ category_id: null, fk_user_id: null, });
    const user_id = props.verify.user_id
    const [Value, setValue] = useState({})

    useEffect(() => {
        setLoading(false)
    }, [props]);

    function refreshdata() {
        setLoading(true);
        setCatfk({ category_id: null, fk_user_id: null, })
        router.replace(router.asPath);
    }
    const handleChange = (e) => {
        setValue({
            ...Value, [e.target.name]: e.target.value,
        })
    }
    const Categortyadd = async (id) => {
        const { value: Name } = await Swal.fire({
            title: 'Category add ',
            input: 'text',
            inputLabel: 'Input category name',
            inputPlaceholder: 'Category name',
            confirmButtonText: 'Confirm',
            confirmButtonColor: 'green',
        })
        if (Name) {
            const payload = {
                category_name: Name
            }
            categortyadd(props.Token, user_id, payload)
                .then(res => {
                    Swal.fire({
                        title: 'Success!!',
                        confirmButtonText: 'Confirm',
                        confirmButtonColor: 'green',
                        text: res.data
                    })
                    console.log('Value', res.data)
                    refreshdata()
                }).catch(err => {
                    console.log(err.response)
                })
        }
    }
    async function Categorydelete() {
        Confirm.fire({
            title: 'Confirm!!',
            text: "Do you want to delete category ?",
            icon: 'warning',
        }).then((result) => {
            if (result.isConfirmed) {
                deletecategory(props.Token, catfk.category_id).then((res) => {
                    Swal.fire({
                        title: 'Deleted!!',
                        text: res.data,
                        icon: 'success'
                    })
                    refreshdata()
                }).catch((err) => {
                    Swal.fire({
                        position: 'top',
                        title: 'Error!',
                        text: err.response.data,
                        icon: 'error',
                        iconColor: 'Red',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'ตกลง'
                    })
                    console.log(err)
                })
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    async function categoryedit() {
        console.log(catfk.category_id, catfk.fk_user_id)
        const { value: Name } = await Swal.fire({
            title: 'Category Edit ',
            input: 'text',
            inputLabel: 'Input category name',
            inputPlaceholder: 'Category name',
            confirmButtonText: 'Confirm',
            confirmButtonColor: 'green',
        })
        if (Name) {
            const payload = {
                category_name: Name
            }
            categortyeditname(props.Token, catfk.category_id, payload)
                .then(res => {
                    Swal.fire({
                        title: 'Success!!',
                        confirmButtonText: 'Confirm',
                        confirmButtonColor: 'green',
                        text: res.data
                    })
                    refreshdata()
                    
                }).catch(err => {
                    console.log(err.response)
                })
        }
    }
    function categoryeditselect(category_id, fk_user_id) {
        console.log(category_id, fk_user_id)
        setCatfk({ category_id: category_id, fk_user_id: fk_user_id })
    }
    return (
        <>
            {loading == true
                ? (
                    <div className="loading-page-container">
                        <div className="loading-page">
                            <div id="spinner"></div>
                            <h1 style={{ color: "rgb(30, 109,169)" }}>Loading . . .</h1>
                        </div>
                    </div>
                )
                : (
                    <div className="usertodolist-con">
                        <div className="usertodolist-con-sub">
                            <div className="usertodolist-card ">
                                <div className="form-group">
                                    <div className="usertodolist-card-content" style={{ maxHeight: "1000px" }}>
                                        <label className="usertodolist-lable">Select Category or add more</label>
                                        <br />
                                        
                                        <select className="form-select form-select-lg mb-3 " size="5" name="category_id" aria-label=".form-select-lg example" required onChange={handleChange}>
                                            {props.category.map((item, index) =>
                                                <option key={index} onClick={() => categoryeditselect(item.category_id, item.fk_user_id)}>{item.category_name}</option>
                                            )
                                            }
                                        </select>
                                        {(Value.category_id !== undefined)
                                            && (
                                                <>
                                                    {catfk.fk_user_id !== null
                                                        && (
                                                            <div className='usertodolist-buttoncon-duedate'>
                                                                <button type="button" className="usertodolist-button-category" onClick={categoryedit}><AiFillEdit /> Edit Category {Value.category_id}</button>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                <button type="button" className="usertodolist-button-duedate-delete" onClick={Categorydelete} > <AiFillDelete /> Delete category {Value.category_id}</button>

                                                            </div>
                                                        )

                                                    }

                                                </>
                                            )
                                        }
                                        <br />
                                        <button type="button" className="button-32" role="button" onClick={Categortyadd} ><AiOutlinePlus /> Add more category</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </>
    )
}
export async function getServerSideProps(context) {
    var Token = await context.req.cookies.jwt_token
    const value = {
        Cookie: Token
    }
    const token = await requesttokens(value)
    const verify = await token.data.decode
    const { params } = context
    const result = await listcategory(Token, params.user_id)
    // const category = await result.data.category
    const category = await result.data.catnull
    // const lists = await result.data.lists
    // const categoryname = await result.data.categoryname
    if (category.length > 0 && params.user_id == verify.user_id) {
        return {
            props: {
                category: category,
                verify: verify,
                Token: Token

            },
        }
    }
    return {
        notFound: true
    };


}
export default Categorydelete