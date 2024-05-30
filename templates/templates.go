package templates

import (
	"bytes"
	"context"
	"embed"
	"fmt"
	"html/template"
	"io"
	"log"

	"github.com/Masterminds/sprig"
)

//go:generate npm run build
//go:embed dist
var dist embed.FS

type RosterUser struct {
	Name string
}

type RosterShift struct {
	ShiftName string
	Users     []RosterUser
}

type RosterDay struct {
	DayTitle string
	Shifts   []RosterShift
}

type RosterContext struct {
	Days []RosterDay
}

var temp *template.Template

func init() {
	var err error
	temp, err = template.New("").Funcs(sprig.HtmlFuncMap()).ParseFS(dist, "dist/**.html")
	if err != nil {
		panic("Failed to parse HTML templates: " + err.Error())
	}

	log.Printf("parsed html templates: %s", temp.Lookup("roster"))
}

func RenderRosterTemplate(ctx context.Context, renderContext RosterContext) (io.Reader, error) {
	// render
	buf := new(bytes.Buffer)
	if err := temp.ExecuteTemplate(buf, "roster", renderContext); err != nil {
		return nil, fmt.Errorf("failed to execute template: %w", err)
	}

	return buf, nil
}
