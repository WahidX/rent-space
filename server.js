const express = require('express');
const port = process.env.PORT || 8000;
// const expressEjsLayouts = require('express-ejs-layouts');

const app = express();
// require('./config/view_helpers')(app);

app.get('/test', function(req, res){

	let data = {
		'name': 'Droid',
		'hobby': 'Gaming'
	};

	return res.json(data);
});


app.listen(port, function(err) {
    if(err) {
        console.log(`Error while running server: ${err}`);
    }

    console.log(`Server running at ${port}`);
})