create sequence hibernate_sequence start 2 increment 1;

create table advert (
    id int8 not null,
    description varchar(5000),
    filename varchar(255),
    title varchar(255),
    sub_category_id int8,
    user_id int8,
    primary key (id)
);

create table authorities (
    id  bigserial not null,
    authority varchar(255),
    user_id int8,
    primary key (id)
);

create table category (
    id  bigserial not null,
    name varchar(255),
    primary key (id)
);

create table comments (
    id  bigserial not null,
    created_date timestamp,
    text varchar(5000),
    advert_id int8,
    user_id int8,
    primary key (id)
);

create table comments_answer (
    id int8 not null,
    created_date timestamp,
    text varchar(5000),
    comment_id int8,
    user_id int8,
    primary key (id)
);

create table sub_category (
    id  bigserial not null,
    name varchar(255),
    category_id int8,
    primary key (id)
);

create table users (
    id int8 not null,
    activation_code varchar(255),
    email varchar(255),
    name varchar(255),
    password varchar(255),
    phone_number varchar(255),
    username varchar(255),
    primary key (id)
);


alter table if exists advert
    add constraint advert_sub_category_fk
    foreign key (sub_category_id)
    references sub_category,
        add constraint advert_user_fk
        foreign key (user_id)
        references users;


alter table if exists authorities
    add constraint authorities_user
    foreign key (user_id) references users;


alter table if exists comments
    add constraint comments_advert_fk
    foreign key (advert_id)
    references advert,
        add constraint comments_user_fk
        foreign key (user_id)
        references users;


alter table if exists comments_answer
    add constraint comments_answer_comment_fk
    foreign key (comment_id)
    references comments,
        add constraint comments_answer_user_fk
        foreign key (user_id)
        references users;


alter table if exists sub_category
    add constraint sub_category_category_fk
    foreign key (category_id)
    references category;