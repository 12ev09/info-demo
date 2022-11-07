import React, { useState, useEffect } from "react";
import axios from "axios";

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

    const apiUrl = "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404";

    const getInfo = (m) => {
        const p = {
            format: "json",
            applicationId: process.env.REACT_APP_APPLICATION_ID,
            isbnjan: "9784908686153",
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
            <div class="autofiller">
                <p>home page.</p>
                <input type="text" value={msg} placeholder="入力してください" onChange={(e) => setMsg(e.target.value)}></input>
                <button onClick={() => getInfo(msg)}>
                    Click me
                </button>
            </div>
            <form class="autofill_revise">
                author<input name="autofill" type="text" value={filled.author} onChange={handleChange('author')}></input>
                isbn<input type="text" value={filled.isbn} onChange={handleChange('isbn')}></input>
                itemPrice<input type="text" value={filled.itemPrice} onChange={handleChange('itemPrice')}></input>
                publisherName<input type="text" value={filled.publisherName} onChange={handleChange('publisherName')}></input>
                salesDate<input type="text" value={filled.salesDate} onChange={handleChange('salesDate')}></input>
                title<input type="text" value={filled.title} onChange={handleChange('title')}></input>
                <input type="submit" value="Confirm" />
            </form>
        </div>
    );
}

export default Home;