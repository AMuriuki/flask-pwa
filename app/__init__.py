from app import routes
from flask import Flask
import logging
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_mail import Mail

subscription_info = {"endpoint": "https://updates.push.services.mozilla.com/push/v1/gAA...",
                     "keys": {"auth": "k8J...", "p256dh": "BOr..."}}

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
mail = Mail(app)

try:
    webpush(
        subscription_info=subscription_info,
        data="Test 123",  # could be json object as well
        vapid_private_key=app.config['WEBPUSH_VAPID_PRIVATE_KEY'],
        vapid_claims={
            "sub": "mailto:arnoldnderitu@gmail.com"
        }
    )
    count += 1
except WebPushException as e:
    logging.exception("webpush fail")

