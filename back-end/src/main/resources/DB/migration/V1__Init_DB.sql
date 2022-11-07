create sequence hibernate_sequence start 2 increment 1;

create table advert (
    id int8 not null,
    description varchar(5000),
    filename varchar(255),
    title varchar(255),
    sub_category_id int8,
    user_id int8,
    price int8,
    status varchar(255),
    image TEXT,
    primary key (id)
);

create table authority (
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
    status varchar(255),
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
    cohort_start_date date,
    email varchar(255),
    name varchar(255),
    password varchar(255),
    phone_number varchar(255),
    username varchar(255),
    primary key (id)
);

create table image_name (
    id int8 not null,
    name TEXT,
    advert_id int8
);

create table user_advert (
    user_id int8,
    advert_id int8
);

alter table if exists user_advert
    add constraint advert_user_fk
        foreign key (advert_id) references advert,
    add constraint user_advert_fk
        foreign key (user_id) references users;

alter table if exists image_name
    add constraint image_name_advert_fk
    foreign key (advert_id)
    references advert;


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

-- insert into users (id, email, name, password, username)
-- values (1, 'igorpoz.1990@gmail.com', 'Игорь Поздеев', '$2a$10$YaPGQYYU7oprrF1y0XLffOQ3MMjX9Vy0W68KWrKRVzOWzd7.s6C/G', 'admin');
--
-- insert into authority (id, authority, user_id)
-- values (1, 'ROLE_ADMIN', 1);