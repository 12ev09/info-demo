import React, { useState, useEffect } from "react";
import axios from "axios";
import 'semantic-ui-css/semantic.min.css'
import { Button } from "semantic-ui-react";


const Home = () => {

        const [msg, setMsg] = useState("");
        const [filled, setFilled] = useState({
                author: "",
                isbn: "",
                itemPrice: "",
                largeImageUrl: "",
                publisherName: "",
                salesDate: "",
                title: "",
        });

        const handleChange = (input) => e => {
                setFilled({ ...filled, [input]: e.target.value });
        };

        const handleFormSubmit = (event) => {
                event.preventDefault();

                const params = {
                        title: "title",
                        author: "hoge",
                }
                fetch('http://localhost:3001/items', {
                        method: 'POST',
                        headers: {
                                'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(params)
                })
                        .then(response => {
                                return response.json();
                        })
                        .then(params => {
                                console.log(params);
                                setFilled({
                                        author: "",
                                        isbn: "",
                                        itemPrice: "",
                                        largeImageUrl: "",
                                        publisherName: "",
                                        salesDate: "",
                                        title: "",
                                })
                        });
        }

        const apiUrl = "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404";

        const getInfo = (m) => {
                //only for debug use
                if (m !== "") {
                        m = "9784908686153"
                }
                const p = {
                        format: "json",
                        applicationId: process.env.REACT_APP_APPLICATION_ID,
                        isbnjan: m,
                }

                axios.get(apiUrl, {
                        params: p
                })
                        .then(function (response) {
                                //console.log(response);
                                //console.log(response.data.Items[0].Item.author)
                                setFilled(
                                        {
                                                author: response.data.Items[0].Item.author,
                                                isbn: response.data.Items[0].Item.isbn,
                                                itemPrice: response.data.Items[0].Item.itemPrice,
                                                largeImageUrl: response.data.Items[0].Item.largeImageUrl,
                                                publisherName: response.data.Items[0].Item.publisherName,
                                                salesDate: response.data.Items[0].Item.salesDate,
                                                title: response.data.Items[0].Item.title,
                                        })
                        })
                        .catch(function (error) {
                                console.log(error);
                        });

                setMsg("");
        }


        return (
                <div>
                        <div className="autofiller">
                                <p>home page.</p>
                                <input type="text" value={msg} placeholder="入力してください" onChange={(e) => setMsg(e.target.value)}></input>
                                <button className="ui positive button" onClick={() => getInfo((msg !== "") ? msg : "9784908686153")}>
                                        Search
                                </button>
                        </div>

                        <form className="autofill_revise" onSubmit={handleFormSubmit}>
                                <div className="ui form">
                                        <div className="three fields">
                                                <div className="field">
                                                        <label htmlFor="author">
                                                                <div>author</div>
                                                                <input id="author" type="text" value={filled.author} onChange={handleChange('author')}></input>
                                                        </label>
                                                </div>
                                                <div className="field">
                                                        <label htmlFor="isbn">
                                                                <div>isbn</div>
                                                                <input id="isbn" type="text" value={filled.isbn} onChange={handleChange('isbn')}></input>
                                                        </label>
                                                </div>
                                                <div className="field">
                                                        <label htmlFor="itemPrice">
                                                                <div>itemPrice</div>
                                                                <input id="itemPrice" type="text" value={filled.itemPrice} onChange={handleChange('itemPrice')}></input>
                                                        </label>
                                                </div>
                                        </div>
                                        <div className="three fields">
                                                <div className="field">
                                                        <label htmlFor="publisherName">
                                                                <div>publisherName</div>
                                                                <input id="publisherName" type="text" value={filled.publisherName} onChange={handleChange('publisherName')}></input><br></br>
                                                        </label>
                                                </div>
                                                <div className="field">
                                                        <label htmlFor="salesDate">
                                                                <div>salesDate</div>
                                                                <input id="salesDate" type="text" value={filled.salesDate} onChange={handleChange('salesDate')}></input><br></br>
                                                        </label>
                                                </div>
                                                <div className="field">
                                                        <label htmlFor="title">
                                                                <div>title</div>
                                                                <input id="title" type="text" value={filled.title} onChange={handleChange('title')}></input><br></br>
                                                        </label>
                                                </div>
                                        </div>
                                </div>
                                <input className="ui positive button" type="submit" value="Confirm" />
                        </form >
                </div >
        );
}

export default Home;