Water My Plants Endpoints

https://water-my-plants-8.herokuapp.com/api

## Login/Register Endpoint

## [POST] /users/register
    --Takes in req.body with the following format:

        {
            "username":"testuser",
            "password":"123", 
            "phone_number":"1111111111"
        } 
- All Strings!!
- Phone_number needs to be 10 characters

    --Returns The New User :
        {
            "user_id": 1,
            "username": "testuser",
            "phone_number": "1111111111"
        }
    
## [POST] /users/login

    --Takes In req.body with the format:
        {
        "username":"testuser","password":"123"
        }
    --Returns A Message and the Token
        {
            "message": "testuser is back!",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWF0IjoxNjQwMTMwNzA0LCJleHAiOjE2NDAyMTcxMDR9.3TSeN2kBbcTLFWbSPjfzIF0daCeFNk_IZ-sD015D7ww"
        }

## ONLY AUTHENTICATED USER CAN HAVE ACCESS TO THIS 

## [GET] /users
        Takes in the user_id from the Token and Returns the account info

## [PUT]/users/:id
    --Takes in the user_id and the updated info.
    --Returns the updated User as an object
    

## /Plants Endpoints
 
## /[GET]
    --Takes in user_id from the token
    --Returns An array of plant objects with the following structure

    {
            "plant_id": 1,
            "nickname": "The Big Kahuna",
            "species": "bigLeaves",
            "plant_image": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F24%2F2021%2F06%2F14%2FGettyImages-1194703346-2000.jpg",
            "h20_freq": "1 day",
            "user_id": 1
    },


## [POST] /plants/add 
    --Needs The User_id from LocalStorage
    --Takes in the Plant object with the following structure:
        {
            "nickname": "Twig", 
            "species": "stick", 
            "h20_freq":"1 day", 
            "plant_image": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F24%2F2021%2F06%2F14%2FGettyImages-1194703346-2000.jpg", 
            "user_id": 1
        }
    -- Returns the Newly Created Plant:
        {
            "plant_id": 3,
            "nickname": "Twig",
            "species": "stick",
            "plant_image": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F24%2F2021%2F06%2F14%2FGettyImages-1194703346-2000.jpg",
            "h20_freq": "1 day",
            "user_id": 1
        }

## [PUT] /plants/:id 
    --Takes in the plant_id from req.params
    --Takes in req.body with the following structure:
        {
        "plant_id": 1,
        "nickname": "The Big Kahuna",
        "species": "bigLeaves",
        "plant_image": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F24%2F2021%2F06%2F14%2FGettyImages-1194703346-2000.jpg",
        "h20_freq": "1 day",
        "user_id": 1
        }
    --Returns The Updated Plant Object:
        {
            "plant_id": 1,
            "nickname": "The Big Kahuna",
            "species": "bigLeaves",
            "plant_image": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F24%2F2021%2F06%2F14%2FGettyImages-1194703346-2000.jpg",
            "h20_freq": "1 day",
            "user_id": 1
        }

  <!-- The user_id Should Be Inside the Token -->

DELETE Plant /plants/:id
## [DELETE] /plants/:id
    --Takes The Id Of The Plant from req.params
    --Returns a Message:
        {
            "Message": "Plant with id ${req.params.id} removed"
        }
