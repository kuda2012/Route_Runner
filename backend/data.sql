
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS routes;


CREATE TABLE "users" (
    "email" text   NOT NULL UNIQUE,
    "name" text NOT NULL,
    "password" text   NOT NULL,
    "google_enabled" boolean   NOT NULL,
    CONSTRAINT "pk_users" PRIMARY KEY (
        "email"
     )
);

CREATE TABLE "routes" (
    "owner" text   NOT NULL,
    "path" text[]   NOT NULL,
    "distance" text   NOT NULL,
    CONSTRAINT "pk_routes" PRIMARY KEY (
        "owner"
     ),
    CONSTRAINT fk_user
    FOREIGN KEY(owner) 
	REFERENCES users(email)
);
