CREATE TABLE videos_by_id(
    id varchar(255) not null,
    status smallint not null,
    url varchar(255) not null,
    datafromAPI varchar(255) not null,
    primary key (id)
);

Create Table comments(
  id varchar(255) not null,
  comment text,
  foreign key(id) references videos_by_id(id)
  );
  

INSERT INTO videos_by_id(id,status,url,datafromAPI)
VALUES('iDhIjrJ7hG0',1 , 'https://www.youtube.com/watch?v=iDhIjrJ7hG0','unrestricted');
INSERT INTO comments(id, comment)
VALUES('iDhIjrJ7hG0',"unrestricted");

INSERT INTO videos_by_id(id,status,url,datafromAPI)
VALUES('HXV3zeQKqGY',2 , 'https://www.youtube.com/watch?v=HXV3zeQKqGY','restricted in some countries');
INSERT INTO comments(id, comment)
VALUES('HXV3zeQKqGY',"Don't watch from 3:30-4:23");

INSERT INTO videos_by_id(id,status,url,datafromAPI)
VALUES('r4YIdn2eTm4',3 , 'https://www.youtube.com/watch?v=r4YIdn2eTm4','restricted in some countries');
INSERT INTO comments(id, comment)
VALUES('r4YIdn2eTm4',"Gore Throughout video");