import React from "react";
import { useRouter } from "next/router";
function Loadingpage() {
    const router = useRouter()
    function goto(){
        router.replace("http://localhost:3000/")
    }
    return (
        <div className="loading-con-head">
            <div className="loading-con">
                            <>
                                <h1 className="unsuccess-verify">𐄂</h1>
                                <br/>
                                <h1>404</h1>
                                <br/>
                                <h1>NO DATA</h1>
                                <h2 onClick={goto}>
                                    <a href="#">
                                        Click hear to Back
                                    </a>
                                </h2>
                            </>
            </div>
        </div>
    );
}

export default Loadingpage;
