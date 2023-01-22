BEGIN;

INSERT INTO tasks VALUES
  (1, 'Create my first todo', '2022-09-16 01:01:01'), 
  (2, 'Buy milk', '2022-09-16 11:10:07'), 
  (3, 'Become a 10x developer', '2022-09-16 23:59:59')
ON CONFLICT(id) DO NOTHING;

COMMIT;

/*
ON CONFLICT ensures that we can run this script multiple times without getting duplicate ID errors.
*/