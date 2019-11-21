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
    returns all `users`.

    /api/users/:id
    returns specific `user`.


POST:<br>
    /auth/register
    Creates new `user`.

    /auth/login
    Login existing `user`.


PUT:<br>
    /:id
    Edits a specific `user`'s information.


DELETE:<br>
    /:id
    Deletes a specific `user`.



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
| first_name| str   | yes       |         |         |
| last_name | str   | yes       |         |         |
| password  | str   | yes       |         |         |
| email     | str   | yes       |         | Yes     |
| city_id   | str   |           |         |         |
| usertype  | *     | yes       |         |         |
| profile_img| str  |           |         |         |

### Salons
| Column    | Type  | Required  | Key     |
|-----------|-------|-----------|---------|
| id        | int   | yes       | primary | 
| name      | str   | yes       |         | 
| address   | str   | yes       |         | 
| city_id   | str   | yes       | foreign |
| profile_img| str  |           |         |

### Cities
| Column    | Type  | Required  | Key     |
|-----------|-------|-----------|---------|
| id        | int   | yes       | primary |
| name      | str   | yes       |         |
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
| stylist_id| str   |           | foreign |
| profile_img| str  |           |         |

### User Comments
| Column    | Type  | Required  | Key     |
|-----------|-------|-----------|---------|
| id        | inc   | yes       | primary | 
| date      | tmstmp|           |         | 
| comment   | text  |           |         | 
| image     | str   |           |         |
| user_id   | str   | yes       | foreign |
| stylist_id| str   |           | foreign |
| salon_id  | str   |           | foreign |