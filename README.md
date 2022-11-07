# Application for Managing Owned Item

## Setup

### Clone
```
git clone https://github.com/12ev09/info-demo.git
```

### Install based on package.json
```
npm i
```

### Setting application id by rakuten api

- Registering a new application and Get application id  [here](https://webservice.rakuten.co.jp/app/create)

- Create env file and define application id like as described below
``` 
REACT_APP_APPLICATION_ID={YOUR_APPLICATION_ID}
```

### setup json server
create db.json and write here ↓
``` json
{
        "items": []
}
```

### Start server
```
npm start
```
Makefile
```
make start
```

### Start JSON server
```
npm run json-server
```

Makefile
```
make db
```