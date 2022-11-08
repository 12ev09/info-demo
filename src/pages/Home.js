import React, { useState, useEffect } from "react";
import axios from "axios";
import 'semantic-ui-css/semantic.min.css'
import { Button, Input, Dropdown } from "semantic-ui-react";

const Home = () => {

        const [msg, setMsg] = useState("");
        const [filled, setFilled] = useState({
                content_type: "",
                affiliateUrl: "",
                artistName: "",
                author: "",
                availability: "",
                booksGenreId: "",
                chirayomiUrl: "",
                discountPrice: "",
                discountRate: "",
                hardware: "",
                isbn: "",
                itemCaption: "",
                itemPrice: "",
                itemUrl: "",
                jan: "",
                label: "",
                largeImageUrl: "",
                limitedFlag: "",
                listPrice: "",
                mediumImageUrl: "",
                os: "",
                postageFlag: "",
                publisherName: "",
                reviewAverage: "",
                reviewCount: "",
                salesDate: "",
                smallImageUrl: "",
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
                        });
        }

        const apiUrl = "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404";

        const getInfo = (m) => {

                const p = {
                        format: "json",
                        applicationId: process.env.REACT_APP_APPLICATION_ID,
                        isbnjan: m,
                }

                axios.get(apiUrl, {
                        params: p
                })
                        .then(function (response) {

                                let content_type;
                                //console.log(response);
                                //console.log(response.data.Items[0].Item.author)
                                if (response.data.Items[0].Item.hardware !== "") {
                                        content_type = "Game";
                                        //setFilled({ content_type: "game", })
                                } else if (response.data.Items[0].Item.os !== "") {
                                        //setFilled({ content_type: "software", })
                                        content_type = "Software";
                                } else if (response.data.Items[0].Item.artistName !== "") {
                                        //setFilled({ content_type: "CD_DVD_BD", })
                                        content_type = "CD_DVD_BD";
                                } else {
                                        //setFilled({ content_type: "books", })
                                        content_type = "Books";
                                }

                                console.log(content_type);

                                setFilled(
                                        {//あたまわるい
                                                content_type: content_type,
                                                affiliateUrl: response.data.Items[0].Item.affiliateUrl,
                                                artistName: response.data.Items[0].Item.artistName,
                                                author: response.data.Items[0].Item.author,
                                                availability: response.data.Items[0].Item.availability,
                                                booksGenreId: response.data.Items[0].Item.booksGenreId,
                                                chirayomiUrl: response.data.Items[0].Item.chirayomiUrl,
                                                discountPrice: response.data.Items[0].Item.discountPrice,
                                                discountRate: response.data.Items[0].Item.discountRate,
                                                hardware: response.data.Items[0].Item.hardware,
                                                isbn: response.data.Items[0].Item.isbn,
                                                itemCaption: response.data.Items[0].Item.itemCaption,
                                                itemPrice: response.data.Items[0].Item.itemPrice,
                                                itemUrl: response.data.Items[0].Item.itemUrl,
                                                jan: response.data.Items[0].Item.isbn,
                                                label: response.data.Items[0].Item.label,
                                                largeImageUrl: response.data.Items[0].Item.largeImageUrl,
                                                limitedFlag: response.data.Items[0].Item.limitedFlag,
                                                listPrice: response.data.Items[0].Item.listPrice,
                                                mediumImageUrl: response.data.Items[0].Item.mediumImageUrl,
                                                os: response.data.Items[0].Item.os,
                                                postageFlag: response.data.Items[0].Item.postageFlag,
                                                publisherName: response.data.Items[0].Item.publisherName,
                                                reviewAverage: response.data.Items[0].Item.reviewAverage,
                                                reviewCount: response.data.Items[0].Item.reviewCount,
                                                salesDate: response.data.Items[0].Item.salesDate,
                                                smallImageUrl: response.data.Items[0].Item.smallImageUrl,
                                                title: response.data.Items[0].Item.title,
                                        })
                                console.log(filled);

                        })
                        .catch(function (error) {
                                console.log(error);
                        });

                setMsg("");
        }

        const content_type_selection = [
                { key: 'Books', value: 'Books', text: 'Books' },
                { key: 'CD_DVD_BD', value: 'CD_DVD_BD', text: 'CD/DVD/BD' },
                { key: 'Goftware', value: 'Software', text: 'Software' },
                { key: 'Game', value: 'Game', text: 'Game' },
        ]

        return (
                <div>
                        <div className={"autofiller ui form"}>
                                <p>home page.</p>
                                <input type="text" value={msg} placeholder="入力してください" onChange={(e) => setMsg(e.target.value)}></input>
                                <button className="ui positive button" onClick={() => getInfo((msg !== "") ? msg : "9784908686153")}>
                                        Search
                                </button>
                        </div>

                        <form className="autofill_revise ui form" onSubmit={handleFormSubmit}>
                                <div className="equal width fields">
                                        <div className="field">
                                                <label>author</label>
                                                <input className="ui input" type="text" value={filled.author} onChange={handleChange('author')}></input>
                                        </div>
                                        <div className="field">
                                                <label>isbn</label>
                                                <input className="ui input" type="text" value={filled.isbn} onChange={handleChange('isbn')}></input>
                                        </div>
                                        <div className="field">
                                                <label>publisherName</label>
                                                <input className="ui input" type="text" value={filled.publisherName} onChange={handleChange('publisherName')}></input>
                                        </div>
                                        <div className="field">
                                                <label>salesDate</label>
                                                <input className="ui input" type="text" value={filled.salesDate} onChange={handleChange('salesDate')}></input>
                                        </div>
                                        <div className="field">
                                                <label>title</label>
                                                <input type="text" value={filled.title} onChange={handleChange('title')}></input>
                                        </div>
                                        <div className="field">
                                                <label>type</label>
                                                <Dropdown placeholder="Contents type" fluid search selection options={content_type_selection} value={filled.content_type} onChange={handleChange('content_type')}></Dropdown>
                                        </div>
                                </div>
                                <input className="ui positive button" type="submit" value="Confirm" />
                        </form>
                </div >
        );
}

export default Home;