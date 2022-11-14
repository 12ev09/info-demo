import React, { useState, useEffect } from "react";
import axios from "axios";
import 'semantic-ui-css/semantic.min.css'
import { Button, Input, Dropdown, Tab, Grid, Container, Table, Select } from "semantic-ui-react";

const Home = () => {

        const [msg, setMsg] = useState("");
        const [filled, setFilled] = useState({
                contentType: 0,
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
        const [activeTabIndex, setActiveTabIndex] = useState("")

        const [items, setItems] = useState([]);

        const handleChange = (input) => e => {
                setFilled({ ...filled, [input]: e.target.value });
        };

        const createTable = () => {
                axios.get('http://localhost:3001/items')
                        .then(function (response) {
                                setItems(response.data)
                                console.log(items)
                        })
                        .catch(function (error) {
                                console.log(error);
                        })
                        .catch(function (error) {
                                console.log(error);
                        });
        }

        const handleFormSubmit = (event) => {
                event.preventDefault();

                const params = {
                        author: filled.author,
                        title: filled.title,
                        isbn: filled.isbn,
                        publisherName: filled.publisherName,
                        salesDate: filled.salesDate,
                        type: filled.contentType,
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
                                createTable();
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

                                let contentType;
                                //console.log(response);
                                //console.log(response.data.Items[0].Item.author)
                                if (response.data.Items[0].Item.hardware !== "") {
                                        contentType = 3;
                                        setActiveTabIndex("3");
                                        //setFilled({ contentType: "game", })
                                } else if (response.data.Items[0].Item.os !== "") {
                                        //setFilled({ contentType: "software", })
                                        contentType = 2;
                                        setActiveTabIndex("2");
                                } else if (response.data.Items[0].Item.artistName !== "") {
                                        //setFilled({ contentType: "CD_DVD_BD", })
                                        contentType = 1;
                                        setActiveTabIndex("1");
                                } else if (response.data.Items[0].Item.publisherName !== "") {
                                        //setFilled({ contentType: "books", })
                                        contentType = 0;
                                        setActiveTabIndex("0");
                                } else {
                                        contentType = "Others";
                                        setActiveTabIndex("4");
                                }

                                //console.log(contentType);

                                setFilled(
                                        {//あたまわるい
                                                contentType: contentType,
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

        useEffect(() => {
                createTable()
        }, [])

        const autofillRevisePanes = [
                {
                        menuItem: 'Books', render: () =>
                                <Tab.Pane>
                                        <Grid stackable columns={3}>
                                                <Grid.Column>
                                                        <div className="field">
                                                                <label>author</label>
                                                                <input className="ui input" type="text" value={filled.author} onChange={handleChange('author')}></input>
                                                        </div>
                                                </Grid.Column>
                                                <Grid.Column>
                                                        <div className="field">
                                                                <label>isbn</label>
                                                                <input className="ui input" type="text" value={filled.isbn} onChange={handleChange('isbn')}></input>
                                                        </div>
                                                </Grid.Column>
                                                <Grid.Column>
                                                        <div className="field">
                                                                <label>publisherName</label>
                                                                <input className="ui input" type="text" value={filled.publisherName} onChange={handleChange('publisherName')}></input>
                                                        </div>
                                                </Grid.Column>
                                                <Grid.Column>
                                                        <div className="field">
                                                                <label>salesDate</label>
                                                                <input className="ui input" type="text" value={filled.salesDate} onChange={handleChange('salesDate')}></input>
                                                        </div>
                                                </Grid.Column>
                                                <Grid.Column>
                                                        <div className="field">
                                                                <label>title</label>
                                                                <input className="ui input" type="text" value={filled.title} onChange={handleChange('title')}></input>
                                                        </div>
                                                </Grid.Column>
                                                <Grid.Column>
                                                        <div className="field">
                                                                <label>type</label>
                                                                <select
                                                                        className="ui fluid search dropdown"
                                                                        value={filled.contentType}
                                                                        onChange={handleChange('contentType')}
                                                                >
                                                                        <option value={0}>Books</option>
                                                                        <option value={1}>CD/DVD/BD</option>
                                                                        <option value={2}>Software</option>
                                                                        <option value={3}>Games</option>
                                                                        <option value={4}>Others</option>
                                                                </select>
                                                        </div>
                                                </Grid.Column>
                                                <Grid.Column>
                                                        <div className="field">
                                                                <label>img</label>
                                                                <img src={filled.largeImageUrl}></img>
                                                        </div>
                                                </Grid.Column>
                                        </Grid>
                                </Tab.Pane >
                },
                { menuItem: 'CD/DVD/BD', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
                { menuItem: 'Software', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
                { menuItem: 'Games', render: () => <Tab.Pane>Tab 4 Content</Tab.Pane> },
                { menuItem: 'Others', render: () => <Tab.Pane>Tab 5 Content</Tab.Pane> },
        ]

        return (
                <div>
                        <body>
                        <header style={{height: '45px', width: '100%', padding: '0px 0px 0px 0px', margin:'0px auto 0px auto', display: 'flex', alignItems: 'center', backgroundColor:'pink'}}>
                                <h1 style={{paddingLeft:'2%'}}>Rakuten API Search</h1>
                        </header>
                        <main style={{minHeight: 'calc(100vh - 85px)'}}>
                        <Container fruid>
                                
                                <div className={"autofiller ui form"}>
                                        <input type="text" value={msg} placeholder="入力してください" onChange={(e) => setMsg(e.target.value)} style={{margin:'20px 0px 20px 0px'}}></input>
                                        <button className="ui positive button" onClick={() => getInfo((msg !== "") ? msg : "9784908686153")} style={{margin: '0px 0px 20px 0px'}}>
                                                Search
                                        </button>
                                </div>
                                <div class="ui divider"></div>
                                <form className="autofill_revise ui form" onSubmit={handleFormSubmit}>
                                        <Tab panes={autofillRevisePanes} activeIndex={activeTabIndex} onTabChange={(e) => setActiveTabIndex(e.target.value)} />
                                        <input className="ui positive button" type="submit" value="Confirm" style={{marginTop:'20px'}}/>
                                </form>
                        
                        <Table celled fixed singleLine>
                                <Table.Header>
                                        <Table.Row>
                                                <Table.HeaderCell>Author</Table.HeaderCell>
                                                <Table.HeaderCell>JAN</Table.HeaderCell>
                                                <Table.HeaderCell>PublisherName</Table.HeaderCell>
                                                <Table.HeaderCell>SalesDate</Table.HeaderCell>
                                                <Table.HeaderCell>Title</Table.HeaderCell>
                                                <Table.HeaderCell>Type</Table.HeaderCell>
                                        </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                        {
                                                items.map(({ id, author, isbn, publisherName, salesDate, title, type }) => {
                                                        return (
                                                                <Table.Row >
                                                                        <Table.Cell>{author}</Table.Cell>
                                                                        <Table.Cell>{isbn}</Table.Cell>
                                                                        <Table.Cell>{publisherName}</Table.Cell>
                                                                        <Table.Cell>{salesDate}</Table.Cell>
                                                                        <Table.Cell>{title}</Table.Cell>
                                                                        <Table.Cell>{type}</Table.Cell>
                                                                </Table.Row>
                                                        )
                                                })
                                        }
                                </Table.Body>
                        </Table>
                        </Container>
                        </main>
                        <footer style={{height:'30px', width:'100%', display: 'flex', alignItems: 'center', margin:'10px auto 0px auto', backgroundColor:'pink'}}>
                                <p style={{paddingLeft:'2%', verticalAlign:'middle'}}>©2022 Yasuhiro Kawabata Some Rights Reserved.</p>
                        </footer>
                        </body>
                </div >
        );
}

export default Home;