package main

import "fmt"
import "strings"
import "net/http"
import "io/ioutil"
import "encoding/json"
import "regexp"
//import "go/token"
//import "go/ast"
import "go/parser"

type Data struct {
	DocDate string `json:"docDate"`
	Sentences []struct {
		Index int `json:"index"`
		Parse string `json:"parse"`
		BasicDependencies []struct {
			Dep string `json:"dep"`
			Governor int `json:"governor"`
			GovernorGloss string `json:"governorGloss"`
			Dependent int `json:"dependent"`
			DependentGloss string `json:"dependentGloss"`
		} `json:"basicDependencies"`
		EnhancedDependencies []struct {
			Dep string `json:"dep"`
			Governor int `json:"governor"`
			GovernorGloss string `json:"governorGloss"`
			Dependent int `json:"dependent"`
			DependentGloss string `json:"dependentGloss"`
		} `json:"enhancedDependencies"`
		EnhancedPlusPlusDependencies []struct {
			Dep string `json:"dep"`
			Governor int `json:"governor"`
			GovernorGloss string `json:"governorGloss"`
			Dependent int `json:"dependent"`
			DependentGloss string `json:"dependentGloss"`
		} `json:"enhancedPlusPlusDependencies"`
		Tokens []struct {
			Index int `json:"index"`
			Word string `json:"word"`
			OriginalText string `json:"originalText"`
			CharacterOffsetBegin int `json:"characterOffsetBegin"`
			CharacterOffsetEnd int `json:"characterOffsetEnd"`
			Pos string `json:"pos"`
			Before string `json:"before"`
			After string `json:"after"`
		} `json:"tokens"`
	} `json:"sentences"`
}

func main() {
	body := strings.NewReader(`The fox jumped over the dog`)
	req, err := http.NewRequest("POST", "http://corenlp.run/?properties=%7B%22annotators%22%3A%20%22tokenize%2Cssplit%2Cpos%2Cparse%2Cdepparse%22%2C%20%22date%22%3A%20%222017-02-25T20%3A42%3A25%22%7D&pipelineLanguage=en", body)
	if err != nil {
		panic(err)
	}
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	resp_body, err := ioutil.ReadAll(resp.Body)

	//resp_string := string(resp_body)

	//in := []byte(resp_string)

	var data Data

	json.Unmarshal(resp_body, &data)

	

	for i := range data.Sentences {
		data.Sentences[i].Parse = strings.Replace(data.Sentences[i].Parse, "(", "{", -1)
		data.Sentences[i].Parse = strings.Replace(data.Sentences[i].Parse, ")", "}", -1)
    	re_inside_whtsp := regexp.MustCompile(`[\s\p{Zs}]{2,}`)
    	data.Sentences[i].Parse = re_inside_whtsp.ReplaceAllString(data.Sentences[i].Parse, " ")
    	fmt.Println(data.Sentences[i].Parse)
    	tokens, err := parser.ParseExpr(data.Sentences[i].Parse)
    	if err != nil {
    		fmt.Println(err)
    	}
    	fmt.Println(tokens)
	}

	dep_tree_info := [][]string{}

	for i := range data.Sentences {
		for j := range data.Sentences[i].BasicDependencies {
			governor := data.Sentences[i].BasicDependencies[j].GovernorGloss
			dependent := data.Sentences[i].BasicDependencies[j].DependentGloss
			dep := data.Sentences[i].BasicDependencies[j].Dep
			obj := []string{governor, dependent, dep}
			dep_tree_info = append(dep_tree_info, obj)	
		}
	}

	fmt.Println(dep_tree_info)
	// var raw map[string]interface{}
	// json.Unmarshal(in, &raw)
	// raw["count"] = 1
	// out, _ := json.Marshal(raw)
	// fmt.Println(string(out))

	//fmt.Println(resp_string)
}
