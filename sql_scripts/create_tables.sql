CREATE TABLE users(ID INT NOT NULL AUTO_INCREMENT, first_name varchar(32) not null ,
                   last_name varchar(32) not null, age int not null,
                   email varchar(32) not null, description varchar(100) null,
                   dateCreated DATETIME DEFAULT CURRENT_TIMESTAMP,
                   dateModified DATETIME ON UPDATE CURRENT_TIMESTAMP,
                   PRIMARY KEY (ID)
);


CREATE TABLE stats ( ID INT NOT NULL AUTO_INCREMENT, wins int NOT NULL,
                        kills int NOT NULL,
                        kd decimal(10,2) not null,
                        kpm int not null,
                        dateCreated DATETIME DEFAULT CURRENT_TIMESTAMP,
                        dateModified DATETIME ON UPDATE CURRENT_TIMESTAMP,
                        userID int not null,
                        PRIMARY KEY (ID),
                        FOREIGN KEY (userID) REFERENCES users(ID)
);