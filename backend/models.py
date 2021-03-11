from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from sqlalchemy.dialects.postgresql import ARRAY

db = SQLAlchemy()
bcrypt = Bcrypt()


def connect_db(app):
    db.app = app
    db.init_app(app)

class User(db.Model):
    """User in the system."""

    __tablename__ = 'users'
    
    id = db.Column(
        db.Integer,
        primary_key=True,
    )
    email = db.Column(
        db.Text,
        nullable=False,
        unique=True,
    )

    name = db.Column(db.Text, nullable=False)
    
    password = db.Column(
        db.Text,
        nullable=False,
    )
    google_enabled = db.Column(db.Boolean, default=False)
    @classmethod
    def signup(cls, email, password, name, google_enabled):
        """Sign up user.

        Hashes password and adds user to system.
        """

        hashed_pwd = bcrypt.generate_password_hash(password).decode('UTF-8')

        user = User(
            name=name,
            email=email,
            password=hashed_pwd,
            google_enabled=google_enabled
        )

        db.session.add(user)
        return user
    @classmethod
    def change_password(cls, user, password):
        """Sign up user.

        Hashes password and adds user to system.
        """

        hashed_pwd = bcrypt.generate_password_hash(password).decode('UTF-8')

        user.password = hashed_pwd
        db.session.add(user)
        db.session.commit()
        return user


    @classmethod
    def authenticate(cls, email, password):
        """Find user with `username` and `password`.

        This is a class method (call it on the class, not an individual user.)
        It searches for a user whose password hash matches this password
        and, if it finds such a user, returns that user object.

        If can't find matching user (or if password is wrong), returns False.
        """

        user = cls.query.filter_by(email=email).first()

        if user:
            is_auth = bcrypt.check_password_hash(user.password, password)
            if is_auth:
                return user

        return False
class Routes(db.Model):
    """Jogging Routes Created."""

    __tablename__ = 'routes'

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    name = db.Column(db.Text, nullable = False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    path = db.Column(ARRAY(db.Text), nullable=False)
    distance = db.Column(db.Text, nullable=False, default=0)
    
    def serialize(self):
        return {
            "id": self.id,
            "name":self.name,
            "owner_id": self.owner_id,
            "path": self.path,
            "distance": self.distance,
        }