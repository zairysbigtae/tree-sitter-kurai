package tree_sitter_kurai_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_kurai "github.com/zairysbigtae/kurai/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_kurai.Language())
	if language == nil {
		t.Errorf("Error loading Kurai grammar")
	}
}
