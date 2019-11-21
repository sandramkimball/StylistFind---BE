# StylistFind Backend Node Database



## Table of Contents

- [Welcome](#welcome)
- [Routes](#routes)
- [Tables](#tables)


## Welcome
This is a side project of mine that was inspired by a previous project. The original project I worked as the senior ReactJS Dev. Now I'm building it entirely on my own.


## Routes

GET: <br>
    /api/users 
    /api/users/:id
    /api/users/:id/reviews
    /api/users/:id/reviews/:id

    /api/stylists
    /api/stylists/:id
    /api/stylists/:id/posts
    /api/stylists/:id/posts/:id


POST:<br>
    /auth/register
    /auth/login

    /api/users/reviews

    /api/stylists/posts


PUT:<br>
    /api/users/:id
    /api/users/:id/reviews/:id
    
    /api/stylsits/:id
    /api/stylsits/:id/posts/:id


DELETE:<br>
    /api/users/:id
    /api/users/:id/reviews/:id

    /api/stylists/:id
    /api/stylists/:id/posts/:id



## Tables

### Stylists
| Column    | Type  | Required  | Key     | Unique  |
|-----------|-------|-----------|---------|---------|
| id        | inc   | yes       | primary |         |
| username  | str   | yes       |         | Yes     |
| first_name| str   | yes       |         |         |
| last_name | str   | yes       |         |         |
| password  | str   | yes       |         |         |
| email     | str   | yes       |         | Yes     |
| profile_img| str  |           |         |         |
| bio       | text  |           |         |         |
| salon_id  | str   | yes       |         |         |
| usertype  | str   | yes       |         |         |


### Users
| Column    | Type  | Required  | Key     | Unique  |
|-----------|-------|-----------|---------|---------|
| id        | inc   | yes       | primary |         |
| username  | str   | yes       |         | Yes     |
| name      | str   | yes       |         |         |
| password  | str   | yes       |         |         |
| email     | str   | yes       |         | Yes     |
| usertype  | *     | yes       |         |         |
| profile_img| str  |           |         |         |

### Salons
| Column    | Type  | Required  | Key     |
|-----------|-------|-----------|---------|
| id        | int   | yes       | primary | 
| salon     | str   | yes       |         | 
| street_address | str   | yes       |         | 
| city      | str   | yes       | foreign |
| zipcode   | str   | yes       | foreign |
| state     | str   | yes       | foreign |
| profile_img| str  |           |         |

### Cities
| Column    | Type  | Required  | Key     |
|-----------|-------|-----------|---------|
| id        | int   | yes       | primary |
| city      | str   | yes       |         |
| zipcode   | str   | yes       | foreign |
| state     | str   | yes       | foreign |
| country_id| int   | yes       | foreign |

country_id REFERENCES id IN TABLE country </br>

### Countries
| Column    | Type  | Required  | Key     |
|-----------|-------|-----------|---------|
| id        | int   | yes       | primary |
| name      | str   | yes       |         |

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