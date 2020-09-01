package view

import (
	"strconv"

	"github.com/kataras/iris/v12"
)

//SendResponse envia respuesta a cliente
func SendResponse(ctx iris.Context, status int, data []byte) {
	ctx.Header("Content-Type", "application/json")
	ctx.Header("status", strconv.Itoa(status))
	ctx.Write(data)
}

//SendErr envia erro a cliente
func SendErr(ctx iris.Context, status int) {
	data := []byte(`{}`)
	ctx.Header("Content-Type", "application/json")
	ctx.Header("status", strconv.Itoa(status))
	ctx.Write(data)
}
