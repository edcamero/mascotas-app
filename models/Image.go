package models

import "sync"

type uploadedFile struct {
	Name string `json:"name"`
	Size int64  `json:"size"`
}

type uploadedFiles struct {
	dir   string
	items []uploadedFile
	mu    sync.RWMutex // slices are safe but RWMutex is a good practise for you.
}
