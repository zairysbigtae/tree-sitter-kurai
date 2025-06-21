import XCTest
import SwiftTreeSitter
import TreeSitterKurai

final class TreeSitterKuraiTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_kurai())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Kurai grammar")
    }
}
