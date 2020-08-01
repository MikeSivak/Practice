--Нужно создать следующие таблицы:

--Марки авто
--Модели авто
--Сам автомобиль (год выпуска, характеристики(скорость, разгон, расход топлива, пробег, клиренс, мощность), описание, фото и цена заполняются вручную)

--Пользователи
--Роли

--Текущие заказы
--История заказов


--Страны производителей авто
--Кузовы авто
--Топливо авто
--Привод авто
--Количесвто цилиндров
--Объём двигателя
--Тип двигателя(ДВС, электро, гибрид)

--Итого: 13 таблиц


-----------------------------------------
--------------The first part-------------
-----------------------------------------

create table car_brand
(
	id int identity(1,1) primary key,
	id_country int not null,
	brand_name nvarchar(50)
);

use auto_shop;
alter table car_brand add foreign key (id_country) references car_country(id); 

create table car_model
(
	id int identity(1,1) primary key,
	id_brand int not null,
	model_name nvarchar(50)
);

alter table car_model add foreign key (id_brand) references car_brand(id);

create table car_body
(
	id int identity(1,1) primary key,
	body_name nvarchar(50) not null
);
use auto_shop;
insert into car_body
values
('седан'),
('универсал'),
('хэтчбек'),
('джип'),
('купе');
select * from car_body;

create table car_fuel
(
	id int identity(1,1) primary key,
	fuel_name nvarchar(50) not null,
	id_engine_type int
);
alter table car_fuel add id_engine_type int;
insert into car_fuel
values
('бензин', 1),
('дизель', 1),
('гибрид', 1),
('газ', 1),
('газ-бензин', 1),
('электро', 2);

select fuel_name, engine_type_name from car_fuel
join engine_type on car_fuel.id_engine_type = engine_type.id;

create table car_drive
(
	id int identity(1,1) primary key,
	drive_name nvarchar(50) not null
);

insert into car_drive
values
('передний'),
('задний'),
('полный');

select * from car_drive;

create table car_cylinders
(
	id int identity(1,1) primary key,
	cylinders_count int not null,
	cylinders_marking nvarchar(20) not null	--V or W for example
);

insert into car_cylinders
values
(4, 'рядный'),
(5, 'рядный'),
(6, 'V'),
(8, 'V'),
(10, 'V'),
(12, 'W'),
(12, 'V'),
(16, 'W');
select * from car_cylinders;
update car_cylinders set cylinders_marking = '4 цилиндра (рядный)' where cylinders_marking = 'рядный' and id=1;
update car_cylinders set cylinders_marking = '5 цилиндров (рядный)' where id=2;
update car_cylinders set cylinders_marking = 'W16' where id=8;
insert into car_cylinders
values ('6 цилиндров (рядный)');

alter table car_cylinders drop column cylinders_count;
delete from car_cylinders;

select * from car_cylinders;

create table engine_type
(
	id int identity(1,1) primary key,
	engine_type_name nvarchar(50) not null
);
--alter table engine_type add id_fuel int;
--alter table engine_type drop column id_fuel;
insert into engine_type
values
('ДВС'),
('ЭЛЕКТРО');
select * from engine_type;



create table car_country
(
	id int identity(1,1) primary key,
	country_name nvarchar(50) not null
);

insert into car_country
values
('Германия'),
('Япония'),
('Швеция'),
('Великобритания'),
('Италия'),
('Россия');

select * from car_country;

create table car
(
	id int identity(1,1) primary key,
	id_model int,
	id_body int,
	id_fuel int,
	id_drive int,
	id_cylinders int,
	id_engine_volume int,
	id_engine_type int
);

alter table car add id_engine_volume int;

create table engine_volume
(
	id int identity(1,1) primary key,
	volume nvarchar(20)
);
alter table engine_volume add volume nvarchar(20);

use auto_shop;
insert into engine_volume
values
('1.4'),('1.6'),('1.8'),('1.9'),('2.0'),
('2.2'),('2.4'),('2.6'),('2.8'),('3.0'),
('3.2'),('3.5'),('3.6'),('3.7'),('3.8'),
('4.0'),('4.2'),('4.4'),('4.5'),('4.6'),
('5.0'),('5.2'),('5.4'),('5.5'),('5.7'),
('6.0'),('6.2'),('6.3'),('6.4'),('6.5'),
('7.0'),('7.1'),('7.2'),('7.4'),('8.0');

select * from engine_volume;

select * from engine_type;

alter table car
add foreign key (id_model) references car_model(id),
foreign key (id_body) references car_body(id),
foreign key (id_fuel) references car_fuel(id),
foreign key (id_drive) references car_drive(id),
foreign key (id_cylinders) references car_cylinders(id),
foreign key (id_engine_type) references engine_type(id);

alter table car add foreign key (id_engine_volume) references engine_volume(id);
alter table car add id_fuel_index int not null;
alter table car add hp int not null;
alter table car add foreign key (id_fuel_index) references fuel_index(id);
alter table car add quantity int not null;

insert into car
values 
(3,2,8,
3,4,1,16,
'500x_audi_rs6_g2080.jpg',
120000, 2020, 'very good car!', 5, 450, 5),
(3,2,8,3,5,1,17,
'audi-rs6-3.5-star-car.jpg',
100000, 2017, 'very power and fast car!', 5, 560, 8);
select * from car
delete from car;
alter table car add 
picture_link nvarchar(max) not null,
price int not null,
years int not null,
descript nvarchar(max);

select * from car_cylinders;

create table fuel_index
(
	id int identity(1,1) primary key,
	index_name nvarchar(20)
);

insert into fuel_index
values
('АИ-76'),
('АИ-80'),
('АИ-92'),
('АИ-95'),
('АИ-98'),
('ДТ');

select * from car;

select *from car_brand;
select brand_name,model_name,body_name,fuel_name,drive_name,engine_type_name,volume,
cylinders_count, cylinders_marking from car
join car_model on car_model.id = car.id_model
join car_brand on car_model.id_brand = car_brand.id
join car_body on car_body.id = car.id_body
join car_fuel on car_fuel.id = car.id_fuel
join car_drive on car_drive.id = car.id_drive
join car_cylinders on car_cylinders.id = car.id_cylinders
join engine_type on engine_type.id = car.id_engine_type
join engine_volume on engine_volume.id = car.id_engine_volume;

select * from car_fuel;

insert into car_brand
values
(1,'Audi'),
(1,'Volkswagen'),
(2,'Mazda'),
(2,'Toyota'),
(4,'Aston Martin'),
(3,'Volvo');

select * from car_brand
join car_country
on car_brand.id_country = car_country.id;
select * from users;

insert into car_model
values
(1,'A8'),
(1,'S8'),
(1,'RS6 C7'),
(2,'Phaeton'),
(2,'Golf 2'),
(3,'626'),
(3,'RX-8'),
(4,'Camry 2017'),
(4,'Land Cruiser 100'),
(5,'DB-9'),
(6,'S80'),
(6,'S60');
select * from car_model;
select * from car_brand
join car_model
on car_model.id_brand = car_brand.id;

-----------------------------------------
-------------The second part-------------
-----------------------------------------

create table roles
(
	id int identity(1,1) primary key,
	role_name nvarchar(50) not null
);

use auto_shop;
insert into roles
values
('admin'),
('user');

create table users
(
	id int identity(1,1) primary key,
	user_login nvarchar(50) not null,
	user_password nvarchar(max),
	user_phone nvarchar(50),
	id_role int references roles(id)
);

alter table users add user_password nvarchar(max);
drop table users;
insert into users
values
('noizemcnorm@gmail.com', '$2a$10$wsJlY8dq5UFEXLeF3mBxyu69jrykv1NQLlbdRWPLmpaAdCSY8AiqS', '+375297314004', 1);

delete from users;

use auto_shop;
SET IDENTITY_INSERT users ON
select * from users;
drop table roles;
alter table users add foreign key (id_role) references roles(id);

-----------------------------------------
-------------The third part--------------
-----------------------------------------

create table current_orders
(
	id int identity(1,1) primary key,
	id_car int,
	id_user int,
	order_date date
);

alter table currenat_orders add foreign key (id_car) references car(id);
use auto_shop;
alter table current_orders add foreign key (id_user) references users(id);

create table orders_history
(
	id int identity(1,1) primary key,
	id_car int,
	id_user int,
	order_date date
);

select * from current_orders;
alter table orders_history add foreign key (id_car) references car(id);
use auto_shop;
alter table orders_history add foreign key (id_user) references users(id);


-----------------------------------------
-------The fouth part - improving--------
-----------------------------------------