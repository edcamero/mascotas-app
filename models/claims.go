package models

type Claims struct {
	Id       string `json:"id" bson:"_id"`
	Rol      string `json:"rol"`
	UserName string `json:"username"`
}

type IClaims interface {
	GetId() string
	GetRol() string
	GetUserName() string
}

func (claim Claims) GetId() string {
	return claim.Id
}

func (claim Claims) GetRol() string {
	return claim.Rol
}

func (claim Claims) GetUserName() string {
	return claim.UserName
}
