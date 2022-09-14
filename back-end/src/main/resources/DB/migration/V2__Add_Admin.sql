insert into users (id, email, name, password, username)
values (1, 'igorpoz.1990@gmail.com', 'Игорь Поздеев', '$2a$10$YaPGQYYU7oprrF1y0XLffOQ3MMjX9Vy0W68KWrKRVzOWzd7.s6C/G', 'admin');

insert into authorities (authority, user_id)
values ('ROLE_ADMIN', 1);