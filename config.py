from datetime import timedelta

class Config(object):
    DEBUG = False
    TESTING = False
    COUCH_SERVER = 'http://localhost:5984'
    REMEMBER_COOKIE_DURATION = timedelta(days=14)
    PWD_SECRET = "aty73habdguaham8a6a"
    APP_MODE = 'local'
    SECRET_KEY = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'

class ProductionConfig(Config):
    COUCH_SERVER = 'http://172.29.28.85:5984'
    APP_MODE = 'remote'

class DevelopmentConfig(Config):
    DEBUG = True

class TestingConfig(Config):
    COUCH_SERVER = 'http://172.29.24.18:5984'
    APP_MODE = 'remote'