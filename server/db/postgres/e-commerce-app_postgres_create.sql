CREATE TABLE users (
	id uuid PRIMARY KEY,
	google_id varchar(30),
	cart_id uuid NOT NULL UNIQUE,
	username varchar(30) NOT NULL UNIQUE,
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

CREATE TABLE product (
	id serial PRIMARY KEY,
	name varchar(50) NOT NULL,
	manufacturer varchar(50) NOT NULL,
	category varchar(50) NOT NULL,
	sell_price money NOT NULL,
	stock_quantity integer NOT NULL
);

CREATE TABLE cart (
	cart_id uuid REFERENCES users(cart_id),
	product_id serial REFERENCES product(id),
	cart_quantity integer NOT NULL,
	PRIMARY KEY (cart_id, product_id)
);

CREATE TABLE orders (
	id serial PRIMARY KEY,
	date date NOT NULL,
	status varchar(20) NOT NULL,
	total money NOT NULL,
	ship_date date,
	shipto_name varchar(60) NOT NULL,
	shipto_street varchar(50) NOT NULL,
	shipto_city varchar(30) NOT NULL,
	shipto_state char(2) NOT NULL,
	shipto_zipcode varchar(10) NOT NULL,
	email varchar(100) NOT NULL,
	pay_method varchar(20) NOT NULL,
	card_num char(4) NOT NULL,
	users_id uuid REFERENCES users(id)
);

CREATE TABLE order_details (
	order_id serial REFERENCES orders(id),
	product_id serial REFERENCES product(id),
	order_quantity integer NOT NULL,
	item_price money NOT NULL,
	PRIMARY KEY (order_id, product_id)
);