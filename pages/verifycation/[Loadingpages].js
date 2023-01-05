import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { verifycation } from "../../function/Auth/Auth";
function Loadingpage({ posts, Status }) {
    const [Load, setLoad] = useState(true);
    const router = useRouter();
    const pages = router.query.Loadingpages;
    console.log("LOADINGPAGES", Status);
    useEffect(() => {
        //code
        if (Status) {
            setLoad(false);
        } else {
            setLoad(true);
        }
    }, [Status]);
    return (
        <div className="loading-con-head">
            <div className="loading-con">
                {Load ? (
                    <>
                        <h1>
                            Verifying... {pages}...{Status}
                        </h1>
                        <div className="lds-roller">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <h1>Please wait</h1>
                    </>
                ) : (
                    <>
                        {Status == 200 ? (
                            <>
                                <h1>{posts}</h1>
                                <h1 className="success-verify">✓</h1>
                                <h2>
                                    <a href="http://localhost:3000/Login">Click hear to login</a>
                                </h2>
                            </>
                        ) : (
                            <>
                                <h1>{posts}</h1>
                                <h1 className="unsuccess-verify">𐄂</h1>
                                <h2>
                                    <a href="http://localhost:3000/Register">
                                        Click hear to Register
                                    </a>
                                </h2>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { params } = context;
    try {
        const result = await verifycation(params.Loadingpages);
        const posts = await result.data;
        const Status = result.status;
        return {
            props: {
                posts,
                Status,
            },
        };
    } catch (err) {
        return {
            props: {
                Status: err.response.status,
                posts: err.response.data,
            },
        };
    }
}

export default Loadingpage;
