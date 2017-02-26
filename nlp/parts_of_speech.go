package main

import (
  "github.com/kamildrazkiewicz/go-stanford-nlp"
  "fmt"
)

func main() {
    var (
        tagger *pos.Tagger
        res    []*pos.Result
        err    error
    )

    if tagger, err = pos.NewTagger(
        "./ext/stanford-nlp/models/english-left3words-distsim.tagger",    // path to model
        "./ext/stanford-nlp/stanford-postagger-3.7.0.jar"); err != nil { // path to jar tagger file
        fmt.Print(err)
        return
    }
    if res, err = tagger.Tag("It is aston martin and you are a crying pig"); err != nil {
        fmt.Print(err)
        return
    }
    for _, r := range res {
        fmt.Println(r.Word, r.TAG)
    }

}
