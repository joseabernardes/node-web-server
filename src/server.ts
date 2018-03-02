import * as express from "express";
import {NextFunction, Request, Response} from "express-serve-static-core";
import * as hbs from 'hbs';
import * as fs from 'fs';

const port = process.env.PORT || 3000;
const app = express();
console.log(__dirname);
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', text => {
    return text.toUpperCase();
});

//middleware
app.use((req: Request, res: Response, next: NextFunction) => {
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


app.set('view engine', 'hbs');//configuarar o HBS
app.set('views', __dirname + '/views'); //conf a pasta views
//wasedgfh

app.get('/', (req: Request, res: Response) => {
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


app.get('/about', (req: Request, res: Response) => {
    // res.send('<h1>Hello Express! 2</h1>');
    // res.send('Abousst');
    res.render('about.hbs', {
        pageTitle: 'About tttitle'
    });
});

app.get('/bad', (req: Request, res: Response) => {
    // res.send('<h1>Hello Express! 2</h1>');

    res.send({
        errorMessage: "unable to error"
    });
});

app.get('/projects', (req: Request, res: Response) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Page'
    });
});

app.listen(port, () => {
    console.log("Server is up on port " + port);
});



