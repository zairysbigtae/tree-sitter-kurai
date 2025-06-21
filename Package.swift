// swift-tools-version:5.3

import Foundation
import PackageDescription

var sources = ["src/parser.c"]
if FileManager.default.fileExists(atPath: "src/scanner.c") {
    sources.append("src/scanner.c")
}

let package = Package(
    name: "TreeSitterKurai",
    products: [
        .library(name: "TreeSitterKurai", targets: ["TreeSitterKurai"]),
    ],
    dependencies: [
        .package(url: "https://github.com/tree-sitter/swift-tree-sitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterKurai",
            dependencies: [],
            path: ".",
            sources: sources,
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterKuraiTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterKurai",
            ],
            path: "bindings/swift/TreeSitterKuraiTests"
        )
    ],
    cLanguageStandard: .c11
)
