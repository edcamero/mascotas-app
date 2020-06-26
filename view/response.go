package view

import (
	"strconv"

	"github.com/kataras/iris/v12"
)

func SendResponse(ctx iris.Context, status int, data []byte) {
	ctx.Header("Content-Type", "application/json")
	ctx.Header("status", strconv.Itoa(status))
	ctx.Write(data)
}

func SendErr(ctx iris.Context, status int) {
	data := []byte(`{}`)
	ctx.Header("Content-Type", "application/json")
	ctx.Header("status", strconv.Itoa(status))
	ctx.Write(data)
}
