from flask import Flask, render_template, request
from flask_mail import Mail,Message

app = Flask(__name__)
mail = Mail(app)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'group12.mca.psgtech@gmail.com'
app.config['MAIL_PASSWORD'] = 'group12ead@psgtech2022'
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)


@app.route("/")
def index():
    return render_template("Home.html")

@app.route("/Home", methods=['POST', 'GET'])
def action():
     if request.method == "POST":
        print(request.json)
        msg = Message(
                request.json["subject"],
                sender ='yourId@gmail.com',
                recipients = [request.json["semail"]]
               )
        msg.body = request.json["msg"]
        mail.send(msg)
        return 'Success'
     else:
        return 'Failure'

if __name__ == '__main__':
    app.run(debug=True)
