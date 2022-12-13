
# #!/bin/bash  
echo "First user created by shell script"  

sqlite3 ./database/photo-service.db <<'END_SQL'
INSERT INTO "profile" 
(gender, photo) 
VALUES ('female', 'London');

INSERT INTO "user"
(username, password, email, profileId)
VALUES('Pertti', 'Pena', 'Doggo', 1);
END_SQL

#  