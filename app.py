from flask import Flask , render_template , request ,redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


app = Flask(__name__)
db = SQLAlchemy(app)

## the sql database confic
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'

#######################################################

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), unique=True, nullable=False)
    kanbans = db.relationship('Kanban', backref='project',lazy=True)
    hubs = db.relationship('Taskhub', backref='project',lazy=True)
    def __repr__(self):
        return self.name
    
## database models
class Kanban(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    tasks = db.relationship('Todo', backref='kanban',lazy=True)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable= False)
    def __repr__(self):
        return self.name
    
class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(1000),nullable=False)
    date = db.Column(db.DateTime,default=datetime.utcnow)
    kanban_id = db.Column(db.Integer, db.ForeignKey('kanban.id'), nullable= False)

    def __repr__(self):
        return self.title  
## database models
    
class Taskhub(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(1000), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable= False)
    tasks = db.relationship('Task', backref='hub',lazy=True)
    def __repr__(self):
        return self.content
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(1000), nullable=False)
    content = db.Column(db.String(1000),nullable=False)
    t_range = db.Column(db.Integer, nullable=False)
    progress = db.Column(db.Integer, nullable=False, default=0)
    date = db.Column(db.DateTime,default=datetime.utcnow)    
    status = db.Column(db.Boolean, default=False)
    hub_id = db.Column(db.Integer, db.ForeignKey('taskhub.id'), nullable= False)
    def __repr__(self):
        return self.content
  
################                          ################

@app.route('/', methods = ['GET','POST'])
def home():
    projects = Project.query.all()
    return render_template('index.html',projects=projects)
    
## project page
@app.route('/project/<int:id>', methods=['GET', 'POST'])
def projectview(id):
    project = Project.query.get_or_404(id)
    return render_template('projects.html', project=project)
    
## kanban page 
@app.route('/kanban/<int:id>', methods = ['GET','POST'])
def kanban(id):
    kanbans = Project.query.filter_by(id=id).first().kanbans
    id = Project.query.filter_by(id=id).first().id
    return render_template('kanban.html', kanbans=kanbans,id = id)

## taskhub page
@app.route('/tasks/<int:id>', methods = ['GET','POST'])
def taskHub(id):
    id = id 
    if Taskhub.query.get(id):
        tasks = Taskhub.query.get(id).tasks
    return render_template('taskhub.html', tasks=tasks, id = id)
    
## add project 
@app.route('/addProject', methods=['POST'])
def addProject():
    name = request.form.get('name')
    p = Project(name=name)
    db.session.add(p)
    db.session.commit()
    return redirect('/')
## add task hub
@app.route('/addhub/<int:id>', methods=['POST'])
def addTaskHub(id):
    name = request.form.get('name')
    h = Taskhub(name=name,project_id=id)
    db.session.add(h)
    db.session.commit()
    return redirect('/project/%s'%id)
    
## add kanban
@app.route('/addKanban/<int:id>', methods=['POST'])
def addKanban(id):
    kanbanName = request.form.get('kanbanName')
    k = Kanban(name=kanbanName,project_id=id)
    db.session.add(k)
    db.session.commit()
    name =  Project.query.get(id).name
    return redirect('/project/%s'%id)
    
## add todo 
@app.route('/addToDo/<int:id>', methods=['POST'])
def addToDo(id):
    task = request.form.get('taskName')
    t = Task(content=task,kanban_id= id)
    db.session.add(t)
    db.session.commit()
    newId =  Kanban.query.get(id).project_id
    name =  Project.query.get(newId).name
    id = Kanban.query.get(id).project_id
    return redirect('/kanban/%s'%id)
    
## add task
@app.route('/addTask/<int:id>', methods=['POST'])
def addTask(id):
    content = request.form.get('content')
    name = request.form.get('name')
    t_range = request.form.get('t_range')
    e = Task(content=content, name=name, t_range=t_range, hub_id = id)
    db.session.add(e)
    db.session.commit()
    return redirect('/tasks/%s'%id)
    
## save the task progrsss
@app.route('/saveTask/<int:id>', methods=['GET', 'POST'])
def savetask(id):
    boom = ''
    for i in Taskhub.query.get(id).tasks:   
        if request.form.get(str(i.id)) == 'on' :
            i.progress = True
            db.session.commit()
    return redirect('/tasks/%s'%id)
    
############################################################
    
## delete project
@app.route('/projectDelete/<int:id>')
def ProjectDelete(id):
    if Project.query.first():
        p = Project.query.get(id)
    else: 
        return redirect('/')
    kanbans = p.kanbans
    for i in kanbans:
        db.session.delete(i)    
    db.session.delete(p)
    db.session.commit()
    return redirect('/')
## delete taskhub
@app.route('/hubDelete/<int:id>')
def taskHubDelete(id):
    e = Taskhub.query.get(id)
    id = e.project.id
    tasks = e.tasks
    for i in tasks:
        db.session.delete(i)
    db.session.delete(e)
    db.session.commit()
    return redirect('/project/%s'%id)
    
## delete task
@app.route('/deleteTask/<int:id>')
def deleteTask(id):
    t = Task.query.get(id)
    db.session.delete(t)
    db.session.commit()
    return redirect('/tasks/%s'%id)

## task page
@app.route('/task/<int:id>', methods=['GET', 'POST'])
def task_page(id):
    task = Task.query.get_or_404(id)
    return render_template('task.html', task=task)

## progress saver form 
@app.route('/progress/<int:id>', methods=['POST'])
def progress(id):
    task = Task.query.get(id)
    task.progress = request.form.get('time')
    db.session.commit()
    return redirect('/task/%s'%id)

if __name__ == '__main__':
    db.create_all()
    app.run(debug=False)
    
    
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% project management app %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

