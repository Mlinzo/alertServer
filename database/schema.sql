-- Postgresql

create type danger as enum('NO_DATA', 'MEDIUM', 'HIGH');

create table a_locations
    (a_id serial primary key,
    a_danger_level danger,
    a_title varchar(50),
    a_dateFrom timestamp,
    a_dateTo timestamp);

create table s_locations
    (s_id serial primary key,
    s_destination integer,
    s_number integer,
    s_address varchar(100));
