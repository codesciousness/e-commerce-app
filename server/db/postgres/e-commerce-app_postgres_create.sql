CREATE TABLE users (
	id serial PRIMARY KEY,
	google_id varchar(30),
	username varchar(30) NOT NULL,
	password varchar(64),
	first_name varchar(30) NOT NULL,
	last_name varchar(30) NOT NULL,
	gender varchar(30),
	date_of_birth date,
	street_address varchar(50),
	city varchar(30),
	state char(2),
	zip_code varchar(10),
	email varchar(100) NOT NULL UNIQUE,
	phone varchar(12)
);

CREATE TABLE cart (
	id serial PRIMARY KEY,
	users_id serial REFERENCES users(id)
);

CREATE TABLE orders (
	id serial PRIMARY KEY,
	date date NOT NULL,
	status varchar(20) NOT NULL,
	ship_date date,
	total money NOT NULL,
	users_id serial REFERENCES users(id)
);

CREATE TABLE product (
	id serial PRIMARY KEY,
	name varchar(50) NOT NULL,
	manufacturer varchar(50) NOT NULL,
	category varchar(50) NOT NULL,
	sell_price money NOT NULL,
	stock_quantity integer NOT NULL
);

CREATE TABLE cart_products (
	cart_id serial REFERENCES cart(id),
	product_id serial REFERENCES product(id),
	cart_quantity integer NOT NULL,
	PRIMARY KEY (cart_id, product_id)
);

CREATE TABLE order_details (
	order_id serial REFERENCES orders(id),
	product_id serial REFERENCES product(id),
	order_quantity integer NOT NULL,
	item_price money NOT NULL,
	PRIMARY KEY (order_id, product_id)
);