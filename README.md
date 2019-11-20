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

### Users
| Column    | Type  | Required  | Key     | Unique  |
|-----------|-------|-----------|---------|---------|
| id        | int   | yes       | primary |         |
| username  | str   | yes       |         | Yes     |
| first_name| str   | yes       |         |         |
| last_name | str   | yes       |         |         |
| password  | str   | yes       |         |         |
| email     | str   | yes       |         | Yes     |
| city_id   | str   |           |         |         |
| profile_img| str  |           | foreign |         |