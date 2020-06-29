from flask import Flask , render_template , request ,redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


app = Flask(__name__)
db = SQLAlchemy(app)

## the sql database confic
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'

#######################################################

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(1000), nullable=False)
    content = db.Column(db.String(1000),nullable=False)
    t_range = db.Column(db.Integer, nullable=False)
    progress = db.Column(db.Integer, nullable=False, default=0)
    date = db.Column(db.DateTime,default=datetime.utcnow)

    def __repr__(self):
        return self.name  
    
################                          ################

## the main page display tasks
@app.route('/', methods = ['GET','POST'])
def home():
    tasks = Task.query.all()
    return render_template('index.html',tasks=tasks)

## task page
@app.route('/task/<int:id>', methods=['GET', 'POST'])
def projectview(id):
    task = Task.query.get_or_404(id)
    return render_template('task.html', task=task)

## add task 
@app.route('/addTask/', methods=['POST'])
def addTask():
    name = request.form.get('name')
    content = request.form.get('content')
    t_range = int(request.form.get('t_range'))
    t = Task(name=name, content=content, t_range=t_range)
    db.session.add(t)
    db.session.commit()
    return redirect('/')

@app.route('/progress/<int:id>', methods=['POST'])
def progress(id):
    task = Task.query.get(id)
    task.progress = request.form.get('time')
    db.session.commit()
    return redirect('/task/%s'%id)


if __name__ == '__main__':
    db.create_all()
    app.run(debug=False)