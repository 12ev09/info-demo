import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {

    const [msg, setMsg] = useState("");
    const apiUrl = "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404";

    const a = (m) => {
        const p = {
            format: "json",
            applicationId: process.env.REACT_APP_APPLICATION_ID,
            isbnjan: "9784908686153",
        }
        if (m !== "") {
            axios.get(apiUrl, {
                params: p
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        setMsg("");
    }


    return (
        <div>
            <p>home page.</p>
            <input type="text" value={msg} placeholder="入力してください" onChange={(e) => setMsg(e.target.value)}></input>
            <button onClick={() => a(msg)}>
                Click me
            </button>
        </div>
    );
}

export default Home;