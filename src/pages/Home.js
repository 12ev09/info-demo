import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {

    const [msg, setMsg] = useState("");
    const [filled, setFilled] = useState({
        author:"",
    });
    const apiUrl = "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404";

    const a = (m) => {
        const p = {
            format: "json",
            applicationId: process.env.REACT_APP_APPLICATION_ID,
            isbnjan: "9784908686153",
        }



        axios.get(apiUrl, {
            params: p
        })
            .then(function (response) {
                console.log(response);
                console.log(response.data.Items[0].Item.author)
                setFilled(
                    {
                        author:response.data.Items[0].Item.author,
                    })
            })
            .catch(function (error) {
                console.log(error);
            });

        setMsg("");
    }


    return (
        <div>
            <div class="autofiller">
                <p>home page.</p>
                <input type="text" value={msg} placeholder="入力してください" onChange={(e) => setMsg(e.target.value)}></input>
                <button onClick={() => a(msg)}>
                    Click me
                </button>
            </div>
            <div class="autofill_revise">
                author<input type="text" value={filled.author}></input>

            </div>
        </div>
    );
}

export default Home;