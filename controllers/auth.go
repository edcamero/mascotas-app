package controllers

import (
    "github.com/kataras/iris/v12"
    "github.com/iris-contrib/middleware/jwt"
)

func getTokenHandler(ctx iris.Context) {
    token := jwt.NewTokenWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "foo": "bar",
    })

    // Sign and get the complete encoded token as a string using the secret
    tokenString, _ := token.SignedString([]byte("My Secret"))

    ctx.HTML(`Token: ` + tokenString + `<br/><br/>
    <a href="/secured?token=` + tokenString + `">/secured?token=` + tokenString + `</a>`)
}

func myAuthenticatedHandler(ctx iris.Context) {
    user := ctx.Values().Get("jwt").(*jwt.Token)

    ctx.Writef("This is an authenticated request\n")
    ctx.Writef("Claim content:\n")

    foobar := user.Claims.(jwt.MapClaims)
    for key, value := range foobar {
        ctx.Writef("%s = %s", key, value)
    }
}