INSERT INTO customer (username, password, first_name, last_name, gender, date_of_birth, street_address, city, state, zip_code, email, phone)
VALUES
('hdiamant0', 'T3fz3WC2', 'Hana', 'Diamant', 'Genderqueer', '1989-10-14', '8 Hoepker Court', 'Seattle', 'WA', 98140, 'hdiamant0@g.co', '425-594-5673'),
('klukash1', '5vjYrn', 'Karyn', 'Lukash', 'Genderqueer', '1977-10-14', '9 Artisan Way', 'Saint Paul', 'MN', 55115, 'klukash1@prnewswire.com', '651-709-5985'),
('awillan2', 'I1ywZY', 'Arvin', 'Willan', 'Male', '1943-06-13', '8 Northridge Court', 'Dallas', 'TX', 75251, 'awillan2@4shared.com', '972-285-0610'),
('lharrie3', 'rafulp', 'Launce', 'Harrie', 'Genderqueer', '1965-11-16', '94 Cottonwood Street', 'Albany', 'NY', 12237, 'lharrie3@ning.com', '518-598-2111'),
('mdoore4', 'oSmVSa', 'Madlin', 'Doore', 'Polygender', '1959-12-16', '3287 Corscot Trail', 'San Antonio', 'TX', 78205, 'mdoore4@google.it', '210-520-6667'),
('bdomney5', 'KFX9ExqzQ', 'Bobbye', 'Domney', 'Bigender', '1934-11-04', '70032 Twin Pines Junction', 'Dayton', 'OH', 45426, 'bdomney5@woothemes.com', '937-826-8337'),
('elantuffe6', 'czWCsteyr4', 'Edmund', 'Lantuffe', 'Agender', '1946-02-01', '486 Iowa Junction', 'Memphis', 'TN', 38119, 'elantuffe6@msn.com', '901-975-3121'),
('gboog7', 'GY3Zzu', 'Gard', 'Boog', 'Male', '1939-12-29', '631 Ramsey Terrace', 'Fort Myers', 'FL', 33913, 'gboog7@admin.ch', '239-853-3089'),
('srennard8', 'xEwlyYV9', 'Sophronia', 'Rennard', 'Bigender', '1987-11-12', '8 Vera Parkway', 'Fort Wayne', 'IN', 46857, 'srennard8@go.com', '260-174-8850'),
('aselbach9', 'oia04RIzzBNe', 'Adolphe', 'Selbach', 'Non-binary', '1934-07-21', '3155 Menomonie Plaza', 'Dallas', 'TX', 75287, 'aselbach9@vk.com', '214-106-9403'),
('bgoodingea', 'jbpBop', 'Berry', 'Goodinge', 'Agender', '1991-10-20', '8 Dixon Court', 'Huntsville', 'TX', 77343, 'bgoodingea@spiegel.de', '936-537-5466'),
('omeritonb', 'eDRcLBJPXw', 'Onfre', 'Meriton', 'Genderfluid', '1949-04-12', '2246 Leroy Drive', 'Young America', 'MN', 55557, 'omeritonb@altervista.org', '952-466-9105'),
('ahurrionc', 'UDigmfRi', 'Averil', 'Hurrion', 'Female', '1972-10-10', '7675 Butternut Circle', 'Migrate', 'KY', 41905, 'ahurrionc@omniture.com', '502-433-2149'),
('wkoopd', 'NByJaAb', 'Whitney', 'Koop', 'Genderqueer', '1927-11-19', '07 Delaware Court', 'Naples', 'FL', 34108, 'wkoopd@deviantart.com', '239-760-8037'),
('psaltsberge', 'Sn7o0XHTV', 'Pate', 'Saltsberg', 'Bigender', '1921-07-06', '44977 Killdeer Avenue', 'Naples', 'FL', 34108, 'psaltsberge@linkedin.com', '941-958-8929'),
('egiacomellof', 'DL235vUA2w8n', 'Earle', 'Giacomello', 'Genderfluid', '1923-09-26', '17814 Maple Wood Street', 'Honolulu', 'HI', 96825, 'egiacomellof@e-recht24.de', '808-435-2323'),
('oweatherbyg', 'V1JTv5cTlCkt', 'Olivero', 'Weatherby', 'Genderfluid', '1938-02-12', '4 Old Shore Parkway', 'Edmond', 'OK', 73034, 'oweatherbyg@mail.ru', '405-945-0308'),
('dfloodgateh', '4rr7H0eG', 'Dalston', 'Floodgate', 'Genderfluid', '1936-11-25', '40288 Dayton Lane', 'Sunnyvale', 'CA', 94089, 'dfloodgateh@histats.com', '650-728-2060'),
('emaunselli', '2UnmJ2pho', 'Elvis', 'Maunsell', 'Female', '1941-06-10', '89 Novick Crossing', 'Milwaukee', 'WI', 53210, 'emaunselli@g.co', '262-249-2608'),
('randrickj', 'Nnn6t0Gm9Y', 'Reggy', 'Andrick', 'Female', '1939-03-19', '417 2nd Hill', 'Santa Ana', 'CA', 92705, 'randrickj@123-reg.co.uk', '714-286-7887');

INSERT INTO cart
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10),
(11, 11),
(12, 12),
(13, 13),
(14, 14),
(15, 15),
(16, 16),
(17, 17),
(18, 18),
(19, 19),
(20, 20);

INSERT INTO orders (date, status, ship_date, total, customer_id)
VALUES
('2015-11-05', 'returned', '2015-11-09', 215.58, 18),
('2010-04-05', 'shipped', '2010-04-09', 1740.09, 19),
('2018-12-23', 'processing', NULL, 61.26, 9),
('2011-10-20', 'shipped', '2011-10-24', 717.82, 3),
('2021-06-17', 'processing', NULL, 1291.48, 8),
('2012-05-15', 'returned', '2012-05-19', 571.69, 11),
('2021-03-29', 'processing', NULL, 1082.62, 14),
('2021-05-04', 'shipped', '2021-05-08', 1944.10, 16),
('2016-03-31', 'processing', NULL, 900.49, 17),
('2013-04-27', 'shipped', '2013-05-01', 550.95, 7),
('2015-04-26', 'completed', '2015-04-30', 1184.41, 5),
('2018-01-19', 'shipped', '2018-01-23', 881.61, 17),
('2011-11-10', 'shipped', '2011-11-14', 1480.43, 16),
('2014-02-15', 'completed', '2014-02-19', 1263.41, 12),
('2020-02-23', 'shipped', '2020-02-27', 1978.80, 15),
('2014-01-12', 'shipped', '2014-01-16', 353.58, 9),
('2019-11-14', 'completed', '2019-11-18', 1375.13, 4),
('2019-11-10', 'processing', NULL, 1462.39, 15),
('2016-05-20', 'returned', '2016-05-24', 1505.87, 20),
('2015-02-01', 'shipped', '2015-02-05', 1754.55, 1);

INSERT INTO product (name, manufacturer, category, sell_price, stock_quantity)
VALUES
('Mus etiam', 'Divavu', 'Beauty', 126.06, 65),
('Etiam', 'Buzzshare', 'Kids', 30.43, 47),
('Tortor', 'Dabjam', 'Sports', 379.33, 91),
('Scelerisque', 'Oodoo', 'Automotive', 254.01, 43),
('Interdum', 'Oyope', 'Grocery', 152.93, 67),
('Vestibulum', 'Meeveo', 'Home', 31.76, 70),
('Convallis eget', 'Flipstorm', 'Books', 243.65, 28),
('Faucibus orci', 'Fivechat', 'Games', 492.21, 65),
('Donec', 'Meezzy', 'Sports', 29.24, 20),
('Blandit ultrices', 'Gevee', 'Computers', 163.86, 31),
('Nunc nisl', 'Browsedrive', 'Tools', 258.92, 28),
('Quis', 'Quamba', 'Tools', 350.38, 74),
('Eget', 'Mita', 'Automotive', 433.50, 54),
('Eu', 'Feedfire', 'Electronics', 425.45, 43),
('Aenean', 'Divape', 'Toys', 416.28, 6),
('Vestibulum', 'Yozio', 'Computers', 429.14, 5),
('Libero', 'Livetube', 'Health', 124.10, 4),
('Neque sapien', 'Mita', 'Movies', 98.87, 70),
('Pede', 'Zoombox', 'Games', 173.20, 0),
('Facilisi cras', 'Devpulse', 'Sports', 186.98, 56);

INSERT INTO cart_products
VALUES
(14, 2, 3),
(6, 3, 5),
(9, 12, 1),
(11, 20, 5),
(17, 3, 5),
(11, 11, 3),
(1, 4, 1),
(14, 3, 2),
(6, 5, 4),
(2, 12, 2),
(14, 16, 5),
(20, 8, 3),
(5, 6, 3),
(20, 18, 5),
(15, 4, 4),
(2, 8, 2),
(5, 7, 3),
(3, 20, 2),
(8, 3, 4),
(10, 1, 5);

INSERT INTO order_details
VALUES
(17, 7, 1, 21.81),
(20, 3, 1, 20.44),
(18, 19, 2, 95.81),
(16, 2, 5, 34.29),
(18, 2, 4, 91.95),
(4, 12, 2, 55.25),
(3, 8, 5, 40.22),
(10, 11, 5, 63.39),
(9, 16, 1, 68.82),
(8, 17, 5, 22.15),
(2, 3, 1, 96.37),
(2, 12, 4, 68.93),
(10, 20, 3, 85.37),
(17, 17, 1, 95.23),
(11, 8, 4, 89.00),
(14, 17, 5, 62.47),
(4, 3, 3, 68.04),
(15, 20, 5, 58.06),
(9, 3, 5, 17.29),
(19, 12, 5, 91.66);