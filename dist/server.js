"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
const app = express();
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', text => {
    return text.toUpperCase();
});
//middleware
app.use((req, res, next) => {
    const now = new Date().toString();
    const log = now + ':' + req.method + req.url;
    fs.appendFile('server.log', log + '\n', err => {
        if (err) {
            console.log(err);
        }
    });
    console.log(log);
    next();
});
//
// app.use((req: Request, res: Response, next: NextFunction) => {
//     res.render('maintain.hbs');
// });
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs'); //configuarar o HBS
// app.set('views', __dirname + '/views'); //conf a pasta views
app.get('/', (req, res) => {
    // res.send('<h1>Hello Express! 2</h1>');
    // res.send({
    //     name: "Paulo",
    //     likes: ['bike', 'city']
    //
    // });
    res.render('home.hbs', {
        pageTitle: 'Home tttitle'
    });
});
app.get('/about', (req, res) => {
    // res.send('<h1>Hello Express! 2</h1>');
    // res.send('Abousst');
    res.render('about.hbs', {
        pageTitle: 'About tttitle'
    });
});
app.get('/bad', (req, res) => {
    // res.send('<h1>Hello Express! 2</h1>');
    res.send({
        errorMessage: "unable to error"
    });
});
app.listen(3000, () => {
    console.log("Server is up on port 3000");
});
