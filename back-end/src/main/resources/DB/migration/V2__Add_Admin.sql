insert into users (id, email, cohort_start_date, name, password, username)
values (1, 'igorpoz.1990@gmail.com', current_date, 'Игорь Поздеев', '$2a$10$YaPGQYYU7oprrF1y0XLffOQ3MMjX9Vy0W68KWrKRVzOWzd7.s6C/G', 'admin');

insert into authority (id, authority, user_id)
values (1, 'ROLE_ADMIN', 1);