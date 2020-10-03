package controllers

import (
    "github.com/kataras/iris/v12"
    "github.com/iris-contrib/middleware/jwt"
)

type Token struct {
    TokenUser string  `json:"tokenUser"`
}

func Login(ctx iris.Context) {
    token:=jwt.NewTokenWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "rol": "adoptante",
    })
    // Sign and get the complete encoded token as a string using the secret
    tokenString, _ := token.SignedString([]byte("Mascotas unipamplona"))
    tokenG := Token{
        TokenUser:tokenString,
    }
   
    ctx.JSON(tokenG)
    //ctx.JSON(iris.Map{"token": tokenString,})
}


func AuthenticatedAdoptante(ctx iris.Context) {
    user := ctx.Values().Get("jwt").(*jwt.Token)

    ctx.Writef("This is an authenticated request\n")
    ctx.Writef("Claim content:\n")

    foobar := user.Claims.(jwt.MapClaims)
    resp:=false
    for key, value := range foobar {
        
        ctx.Writef("%s = %s", key, value)
        if key=="rol"&&value=="adoptante"{
            resp=true;
        }
    }

    if !resp {
        user=nil
    }

   
 
    
    
}