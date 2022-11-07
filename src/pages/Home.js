import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {

    const [msg, setMsg] = useState("");
    const [result, setResult] = useState({
        title: "",
        author: "",
        publisher: "",
        jan: "",
        salesDate: ""
    });

    const handleChange = (input) => e => {
        setResult({...result, [input] : e.target.value});
    };


    const handleSubmit = (e) => {
        console.log(result);
    }

    const apiUrl = "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404";

    const getInfo = (m) => {
        const p = {
            format: "json",
            applicationId: process.env.REACT_APP_APPLICATION_ID,
            isbnjan: m,
        }
        if (m !== "") {
            axios.get(apiUrl, {
                params: p
            })
                .then(function (response) {
                    console.log(response);
                    setResult(
                        {
                            title: response.data.Items[0].Item.title,
                            author: response.data.Items[0].Item.author,
                            publisher: response.data.Items[0].Item.publisherName,
                            jan: m,
                            salesDate: response.data.Items[0].Item.salesDate
                        });
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
            <input type="text" value={msg} placeholder="JANコードを入力してください" onChange={(e) => setMsg(e.target.value)}></input>
            <button onClick={() => getInfo(msg)}>
                Search
            </button>
            <br></br>
            <br></br>
            <form onSubmit={handleSubmit}>
                Title: <input type="text" id="titleBox" value={result.title} onChange={handleChange("title")} /><br></br>
                Author: <input type="text" id="authorBox" value={result.author} onChange={handleChange("author")} /><br></br>
                Publisher: <input type="text" id="publisherBox" value = {result.publisher} onChange={handleChange("publisher")} /><br></br>
                JAN-code: <input type="text" id="janBox" value={result.jan} onChange={handleChange("jan")} /><br></br>
                salesDate: <input type="text" id="salesDateBox" value={result.salesDate} onChange={handleChange("salesDate")} /><br></br>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Home;