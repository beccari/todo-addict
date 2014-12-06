
// set up =======================
var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();

// configs

mongoose.connect('mongodb://meceap.devdb.local:27017/todo');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(methodOverride());


// model
var Todo = mongoose.model('Todo', {
	text: String,
	done: Boolean
});

var respondAll = function(res) {
	Todo.find(function(err, todos) {
		if (err)
			res.send(err);

		res.json(todos);
	})
}
// routes -----------------------------------------------------
	// api
	
	// get all todos
	app.get('/api/todos', function(req, res) {
		respondAll(res);
	});

	// post a new todo
	app.post('/api/todos', function(req, res) {
		Todo.create({
			text: req.body.text,
			done: false
		}, function(err, todo) {
			if (err)
				res.send(err);

			respondAll(res);
		})
	});

	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id: req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);
			respondAll(res);
		})
	});


// end routes ----------------------------------------------

// application ---------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
// end application -----------------------------------------
// listen app with node server.js
var port = 8088;
app.listen(port);
console.log("App listening on port " + port);