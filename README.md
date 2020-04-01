# StylistFind Backend Node Database

- [Welcome](#welcome)
- [Routes](#routes)
- [Tables](#tables)


## Welcome
This is a side project of mine that was inspired by a previous project. The original project I worked as the senior ReactJS Dev. Now I'm building it entirely on my own.


## Routes

GET: <br>
    /users 
    /users/:id
    /users/:id/reviews

    /stylists
    /stylists/:id
    /stylists/:id/posts

    /search/:city
    /search/:zipcode
    /search/:salon
    /search/:stylist


POST:<br>
    /auth/register/stylist
    /auth/login/stylist
    /stylists/:id/posts

    /auth/register/user
    /auth/login/user
    /users/:id/reviews


PUT:<br>
    /users/:id
    /users/:id/reviews/:id
    
    /stylsits/:id
    /stylsits/:id/posts/:id


DELETE:<br>
    /users/:id
    /users/:id/reviews/:id

    /stylists/:id
    /stylists/:id/posts/:id



## Tables

### Stylists
| Column    | Type  | Required  | Key     | Unique  |
|-----------|-------|-----------|---------|---------|
| id        | inc   | yes       | primary |         |
| first_name| str   | yes       |         |         |
| last_name | str   | yes       |         |         |
| password  | str   | yes       |         |         |
| email     | str   | yes       |         | Yes     |
| profile_img| str  |           |         |         |
| bio       | text  |           |         |         |
| usertype  | str   | yes       |         |         |


### Users
| Column    | Type  | Required  | Key     | Unique  |
|-----------|-------|-----------|---------|---------|
| id        | inc   | yes       | primary |         |
| first_name| str   | yes       |         |         |
| last_name | str   | yes       |         |         |
| password  | str   | yes       |         |         |
| email     | str   | yes       |         | Yes     |
| usertype  | str   | yes       |         |         |
| profile_img| str  |           |         |         |

### Salons
| Column    | Type  | Required  | Key     |
|-----------|-------|-----------|---------|
| id        | int   | yes       | primary | 
| salon     | str   | yes       |         | 
| street_address | str | yes    |         | 
| city      | str   | yes       |         |
| zipcode   | str   | yes       |         |
| state     | str   | yes       |         |
| stylist_id | str  | yes       | foreign |

### Stylist Posts
| Column    | Type  | Required  | Key     |
|-----------|-------|-----------|---------|
| id        | inc   | yes       | primary | 
| date      | tmstmp|           |         | 
| comment   | text  |           |         | 
| image     | str   |           |         |
| stylist_id| str   |           | foreign |

### User Reviews
| Column    | Type  | Required  | Key     |
|-----------|-------|-----------|---------|
| id        | inc   | yes       | primary | 
| date      | tmstmp|           |         | 
| review    | text  |           |         | 
| image     | str   |           |         |
| user_id   | str   | yes       | foreign |
| stylist_id| str   |           | foreign |
| salon_id  | str   |           | foreign |