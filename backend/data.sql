DROP TABLE IF EXISTS routes;
DROP TABLE IF EXISTS users;



CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "email" text NOT NULL UNIQUE,
    "name" text NOT NULL,
    "password" text   NOT NULL,
    "google_enabled" boolean   NOT NULL
);

CREATE TABLE "routes" (
    "id" SERIAL PRIMARY KEY,
    "owner_id" INT,
    "name" text,
    "path" text[]   NOT NULL,
    "distance" text   NOT NULL,
    CONSTRAINT fk_user
    FOREIGN KEY(owner_id) 
	REFERENCES users(id)
);
