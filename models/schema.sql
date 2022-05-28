-- Postgresql

create type danger as enum('NO_DATA', 'MEDIUM', 'HIGH', 'NO_DANGER');

create table a_locations
    (a_id serial primary key,
    a_danger_level danger not null,
    a_title varchar(50) not null,
    a_dateFrom timestamp not null default current_timestamp);

create table s_locations
    (s_id serial primary key,
    s_destination integer not null,
    s_number integer not null,
    s_address varchar(100) not null);

create table clients
    (c_id varchar(50) primary key,
    fcm_token varchar(200),
    region varchar(50));

create table r_tokens
    (c_id varchar(50) primary key,
    r_token varchar(250),
    last_refresh timestamp not null default current_timestamp,
    constraint fk_client
        foreign key (c_id)
            references clients(c_id)
            on delete cascade);