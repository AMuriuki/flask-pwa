from flask import render_template, request
from app import app
from pywebpush import webpush, WebPushException

@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
def index():
    return render_template('index.html')


@app.route('/service-worker.js')
def sw():
    return app.send_static_file('service-worker.js')


@app.route('/submit', methods=['GET', 'POST'])
def submit_form():
    payload = request.get_json()
    print(payload)
    first_name = payload['first_name']
    middle_name = payload['middle_name']
    last_name = payload['last_name']
    email = payload['email']
    address = payload['address']
    message = payload['message']
    print(first_name, middle_name, last_name, email,
          address, message)
    return ''


def send_web_push(subscription_information, message_body):
    return webpush(
        subscription_info=subscription_information,
        data=message_body,
        vapid_private_key=app.config['VAPID_PRIVATE_KEY'],
        vapid_claims=app.config['VAPID_CLAIMS']
    )
