create table blogs(
    id serial primary key,
    username varchar(255) not null,
    title text not null,
    image_id text not null,
    description text not null,
    createAt timestamptz default now(),
    foreign key (id) references administrator(id)
);

create table administrator (
    id serial primary key,
    name text not null,
    username varchar(255) not null,
    password varchar(255) not null,
    createAt timestamptz default now()
);

create table messages(
    id serial primary key,
    name varchar(255) not null,
    email varchar(255) not null,
    subject varchar(255) not null,
    message text not null,
    createAt timestamptz default now()

);

create table comments(
    id serial primary key,
    name varchar(255) not null,
    email varchar(255) not null,
    website varchar(255) not null,
    message text not null,
    createAt timestamptz default now()
);

