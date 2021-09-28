CREATE TABLE customer (
	id integer PRIMARY KEY,
	first_name varchar(30) NOT NULL,
	last_name varchar(30) NOT NULL,
	gender varchar(30),
	date_of_birth date,
	street_address varchar(50) NOT NULL,
	city varchar(30) NOT NULL,
	state char(2) NOT NULL,
	zip_code varchar(10) NOT NULL,
	email varchar(100) NOT NULL UNIQUE,
	phone varchar(12)
);

CREATE TABLE cart (
	id integer PRIMARY KEY,
	customer_id integer REFERENCES customer(id)
);

CREATE TABLE orders (
	id integer PRIMARY KEY,
	date date NOT NULL,
	status varchar(20) NOT NULL,
	ship_date date,
	total money NOT NULL,
	customer_id integer REFERENCES customer(id)
);

CREATE TABLE product (
	id integer PRIMARY KEY,
	name varchar(50) NOT NULL,
	manufacturer varchar(50) NOT NULL,
	category varchar(50) NOT NULL,
	sell_price money NOT NULL,
	stock_quantity integer NOT NULL
);

CREATE TABLE cart_products (
	cart_id integer REFERENCES cart(id),
	product_id integer REFERENCES product(id),
	cart_quantity integer NOT NULL,
	PRIMARY KEY (cart_id, product_id)
);

CREATE TABLE order_details (
	order_id integer REFERENCES orders(id),
	product_id integer REFERENCES product(id),
	order_quantity integer NOT NULL,
	item_price money NOT NULL,
	PRIMARY KEY (order_id, product_id)
);