package services

import (
	"context"
	"errors"
	"os"
	"path/filepath"
	"strings"
	"sync"

	"github.com/kataras/iris/v12"
)

const uploadsDir = "./public/uploads/"

type uploadedFile struct {
	Name string `json:"name"`
	Size int64  `json:"size"`
}

type uploadedFiles struct {
	dir   string
	items []uploadedFile
	mu    sync.RWMutex // slices are safe but RWMutex is a good practise for you.
}

type PhotoService interface {
	udpload(ctx context.Context, newAnimal *uploadedFile) (bool, error)
}

func scanUploads(dir string) *uploadedFiles {
	f := new(uploadedFiles)

	lindex := dir[len(dir)-1]
	if lindex != os.PathSeparator && lindex != '/' {
		dir += string(os.PathSeparator)
	}

	// create directories if necessary
	// and if, then return empty uploaded files; skipping the scan.
	if err := os.MkdirAll(dir, os.FileMode(0666)); err != nil {
		return f
	}

	// otherwise scan the given "dir" for files.
	f.scan(dir)
	return f
}

func (f *uploadedFiles) scan(dir string) {
	f.dir = dir
	filepath.Walk(dir, func(path string, info os.FileInfo, err error) error {

		// if it's directory or a thumbnail we saved earlier, skip it.
		if info.IsDir() || strings.HasPrefix(info.Name(), "thumbnail_") {
			return nil
		}

		f.add(info.Name(), info.Size())

		return nil
	})
}

func (f *uploadedFiles) add(name string, size int64) uploadedFile {
	uf := uploadedFile{
		Name: name,
		Size: size,
	}
	f.mu.Lock()
	f.items = append(f.items, uf)
	f.mu.Unlock()

	return uf
}

func Udpload(ctx iris.Context) {
	// Get the file from the dropzone request
	file, info, err := ctx.FormFile("file")
	if err != nil {
		ctx.StatusCode(iris.StatusInternalServerError)
		ctx.Application().Logger().Warnf("Error while uploading: %v", err.Error())
		return
	}

	defer file.Close()

	if _, err := os.Stat(uploadsDir); errors.Is(err, os.ErrNotExist) {
		err := os.MkdirAll(uploadsDir, 0700)
		if err != nil {
			ctx.Application().Logger().Warnf(err.Error())
		}
	}
	// Create a file with the same name
	// assuming that you have a folder named 'uploads'
	_, err = ctx.SaveFormFile(info, filepath.Join(uploadsDir, info.Filename))

	if err != nil {
		ctx.StatusCode(iris.StatusInternalServerError)
		ctx.Application().Logger().Warnf("Error while preparing the new file: %v", err.Error())
		return
	}

}
