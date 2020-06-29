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
    hubs = db.relationship('Ekedhub', backref='project',lazy=True)
    def __repr__(self):
        return self.name
    
## database models
class Kanban(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    tasks = db.relationship('Task', backref='auther',lazy=True)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable= False)
    def __repr__(self):
        return self.name
    
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(1000),nullable=False)
    date = db.Column(db.DateTime,default=datetime.utcnow)
    kanban_id = db.Column(db.Integer, db.ForeignKey('kanban.id'), nullable= False)

    def __repr__(self):
        return self.title  
## database models
    
class Ekedhub(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(1000), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable= False)
    ekeds = db.relationship('Eked', backref='hub',lazy=True)
    def __repr__(self):
        return self.content
class Eked(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(1000), nullable=False)
    content = db.Column(db.String(1000),nullable=False)
    t_range = db.Column(db.Integer, nullable=False)
    progress = db.Column(db.Integer, nullable=False, default=0)
    date = db.Column(db.DateTime,default=datetime.utcnow)    
    content = db.Column(db.String(1000), nullable=False)
    status = db.Column(db.Boolean, default=False)
    hub_id = db.Column(db.Integer, db.ForeignKey('ekedhub.id'), nullable= False)
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
    
@app.route('/ekeds/<int:id>', methods = ['GET','POST'])
def ekedHub(id):
    id = id 
    ekeds = Ekedhub.query.get(id).ekeds
    return render_template('ekedhub.html', ekeds=ekeds, id = id)
    
    ## add project 
@app.route('/addProject', methods=['POST'])
def addProject():
    name = request.form.get('name')
    p = Project(name=name)
    db.session.add(p)
    db.session.commit()
    return redirect('/')
## add eked hub
@app.route('/addhub/<int:id>', methods=['POST'])
def addEkedHub(id):
    name = request.form.get('name')
    h = Ekedhub(name=name,project_id=id)
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
    
## add task 
@app.route('/addTask/<int:id>', methods=['POST'])
def addTask(id):
    task = request.form.get('taskName')
    t = Task(content=task,kanban_id= id)
    db.session.add(t)
    db.session.commit()
    newId =  Kanban.query.get(id).project_id
    name =  Project.query.get(newId).name
    id = Kanban.query.get(id).project_id
    return redirect('/kanban/%s'%id)
    
    ## add eked
@app.route('/addEked/<int:id>', methods=['POST'])
def ekedAdder(id):
    content = request.form.get('content')
    e = Eked(content = content,hub_id = id)
    db.session.add(e)
    db.session.commit()
    return redirect('/ekeds/%s'%id)
    
## save the eked progrsss
@app.route('/saveEked/<int:id>', methods=['GET', 'POST'])
def saveeked(id):
    boom = ''
    for i in Ekedhub.query.get(id).ekeds:   
        if request.form.get(str(i.id)) == 'on' :
            i.progress = True
            db.session.commit()
    return redirect('/ekeds/%s'%id)
    
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
    ## delete ekedhub
@app.route('/hubDelete/<int:id>')
def ekedHubDelete(id):
    e = Ekedhub.query.get(id)
    id = e.project.id
    ekeds = e.ekeds
    for i in ekeds:
        db.session.delete(i)
    db.session.delete(e)
    db.session.commit()
    return redirect('/project/%s'%id)
    
## delete eked
@app.route('/deleteEked/<int:id>')
def deleteKanban(id):
    e = Eked.query.get(id)
    id = e.hub.id
    db.session.delete(e)
    db.session.commit()
    return redirect('/ekeds/%s'%id)
'''@app.route('/task/<int:id>', methods=['GET', 'POST'])
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
    return redirect('/')'''

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

