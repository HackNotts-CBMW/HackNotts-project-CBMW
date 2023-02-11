create table if not exists users (
    id integer primary key autoincrement,
    email text not null unique,
    password text not null,
    account_id text not null
);