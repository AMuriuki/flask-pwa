import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))


class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'flask-pwa.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MAIL_SERVER = os.environ.get('MAIL_SERVER')
    MAIL_PORT = int(os.environ.get('MAIL_PORT') or 25)
    MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS') is not None
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    ADMINS = ['']
    LOG_TO_STDOUT = os.environ.get('LOG_TO_STDOUT')
    SECURITY_PASSWORD_SALT = ''
    WEBPUSH_VAPID_PRIVATE_KEY = 'xxx'
    DER_BASE64_ENCODED_PRIVATE_KEY_FILE_PATH = os.path.join(
        os.getcwd(), "private_key.pem")
    DER_BASE64_ENCODED_PUBLIC_KEY_FILE_PATH = os.path.join(
        os.getcwd(), "public_key.pem")
    VAPID_PRIVATE_KEY = open(
        DER_BASE64_ENCODED_PRIVATE_KEY_FILE_PATH, "r+").readline().strip("\n")
    VAPID_PUBLIC_KEY = open(
        DER_BASE64_ENCODED_PUBLIC_KEY_FILE_PATH, "r+").read().strip("\n")
    VAPID_CLAIMS = {
        "sub": "mailto:arnoldnderitu@gmail.com"
    }
