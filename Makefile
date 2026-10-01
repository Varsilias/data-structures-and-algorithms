SHELL := /bin/zsh

ROOT := $(CURDIR)
TS_CONFIG := data-structures/tsconfig.json
TS_BUILD_DIR := .build/typescript
JAVA_BUILD_DIR := .build/java
TSC := ./node_modules/.bin/tsc

.PHONY: help doctor list-status list-problems list-test list-test-ts list-test-go list-test-java stack-status stack-problems stack-test stack-test-ts stack-test-go stack-test-java queue-status queue-problems queue-test queue-test-ts queue-test-go queue-test-java ring-buffer-status ring-buffer-problems ring-buffer-test ring-buffer-test-ts ring-buffer-test-go ring-buffer-test-java dynamic-ring-buffer-status dynamic-ring-buffer-problems dynamic-ring-buffer-test dynamic-ring-buffer-test-ts dynamic-ring-buffer-test-go dynamic-ring-buffer-test-java linked-list-status linked-list-problems linked-list-test linked-list-test-ts linked-list-test-go linked-list-test-java hash-map-status hash-map-problems hash-map-test hash-map-test-ts hash-map-test-go hash-map-test-java tree-status tree-problems tree-test tree-test-ts tree-test-go tree-test-java heap-status heap-problems heap-test heap-test-ts heap-test-go heap-test-java graph-status graph-problems graph-test graph-test-ts graph-test-go graph-test-java trie-status trie-problems trie-test trie-test-ts trie-test-go trie-test-java list-clean

help:
	@echo "Available targets:"
	@echo "  make doctor         Check required runtimes and local toolchain"
	@echo "  make list-status    Show the ArrayList track and next actions"
	@echo "  make list-problems  Print the 10 list-focused problems"
	@echo "  make list-test      Run ArrayList tests in TypeScript, Go, and Java"
	@echo "  make list-test-ts   Run the TypeScript ArrayList test suite"
	@echo "  make list-test-go   Run the Go ArrayList test suite"
	@echo "  make list-test-java Run the Java ArrayList test suite"
	@echo "  make stack-status   Show the Stack track and next actions"
	@echo "  make stack-problems Print the 10 stack-focused problems"
	@echo "  make stack-test     Run Stack tests in TypeScript, Go, and Java"
	@echo "  make stack-test-ts  Run the TypeScript Stack test suite"
	@echo "  make stack-test-go  Run the Go Stack test suite"
	@echo "  make stack-test-java Run the Java Stack test suite"
	@echo "  make queue-status   Show the Queue track and next actions"
	@echo "  make queue-problems Print the 10 queue-focused problems"
	@echo "  make queue-test     Run Queue tests in TypeScript, Go, and Java"
	@echo "  make queue-test-ts  Run the TypeScript Queue test suite"
	@echo "  make queue-test-go  Run the Go Queue test suite"
	@echo "  make queue-test-java Run the Java Queue test suite"
	@echo "  make ring-buffer-status   Show the Ring Buffer track and next actions"
	@echo "  make ring-buffer-problems Print the ring-buffer-focused problems"
	@echo "  make ring-buffer-test     Run Ring Buffer tests in TypeScript, Go, and Java"
	@echo "  make ring-buffer-test-ts  Run the TypeScript Ring Buffer test suite"
	@echo "  make ring-buffer-test-go  Run the Go Ring Buffer test suite"
	@echo "  make ring-buffer-test-java Run the Java Ring Buffer test suite"
	@echo "  make dynamic-ring-buffer-status   Show the Dynamic Ring Buffer track and next actions"
	@echo "  make dynamic-ring-buffer-problems Print the dynamic-ring-buffer-focused problems"
	@echo "  make dynamic-ring-buffer-test     Run Dynamic Ring Buffer tests in TypeScript, Go, and Java"
	@echo "  make dynamic-ring-buffer-test-ts  Run the TypeScript Dynamic Ring Buffer test suite"
	@echo "  make dynamic-ring-buffer-test-go  Run the Go Dynamic Ring Buffer test suite"
	@echo "  make dynamic-ring-buffer-test-java Run the Java Dynamic Ring Buffer test suite"
	@echo "  make linked-list-status   Show the Linked List track and next actions"
	@echo "  make linked-list-problems Print the linked-list-focused problems"
	@echo "  make linked-list-test     Run Linked List tests in TypeScript, Go, and Java"
	@echo "  make hash-map-status      Show the Hash Map track and next actions"
	@echo "  make hash-map-problems    Print the hash-map-focused problems"
	@echo "  make hash-map-test        Run Hash Map tests in TypeScript, Go, and Java"
	@echo "  make tree-status          Show the Binary Search Tree track and next actions"
	@echo "  make tree-problems        Print the tree-focused problems"
	@echo "  make tree-test            Run Binary Search Tree tests in TypeScript, Go, and Java"
	@echo "  make heap-status          Show the Binary Min Heap track and next actions"
	@echo "  make heap-problems        Print the heap-focused problems"
	@echo "  make heap-test            Run Binary Min Heap tests in TypeScript, Go, and Java"
	@echo "  make graph-status         Show the Graph track and next actions"
	@echo "  make graph-problems       Print the graph-focused problems"
	@echo "  make graph-test           Run Graph tests in TypeScript, Go, and Java"
	@echo "  make trie-status          Show the Trie track and next actions"
	@echo "  make trie-problems        Print the trie-focused problems"
	@echo "  make trie-test            Run Trie tests in TypeScript, Go, and Java"
	@echo "  make list-clean     Remove generated build output"

doctor:
	@command -v node >/dev/null || { echo "node is required for the TypeScript track. Install Node.js first."; exit 1; }
	@test -x "$(TSC)" || { echo "TypeScript is not installed locally. Run 'npm install' in the repo root."; exit 1; }
	@command -v go >/dev/null || { echo "go is required for the Go track. Install Go first."; exit 1; }
	@command -v javac >/dev/null || { echo "javac is required for the Java track. Install a JDK first."; exit 1; }
	@echo "Toolchain check passed."

list-status:
	@sed -n '1,220p' data-structures/journey.md
	@printf "\n"
	@sed -n '1,220p' data-structures/list/IMPLEMENTATION_CHECKLIST.md

list-problems:
	@sed -n '1,220p' data-structures/list/problems/selected-problems.md

list-test: list-test-ts list-test-go list-test-java

list-test-ts: doctor
	@mkdir -p "$(TS_BUILD_DIR)"
	@"$(TSC)" --project "$(TS_CONFIG)" --outDir "$(TS_BUILD_DIR)"
	@node "$(TS_BUILD_DIR)/list/tests/array-list.test.js"

list-test-go: doctor
	@mkdir -p "$(ROOT)/.build/go-cache" "$(ROOT)/.build/go-tmp"
	@GOCACHE="$(ROOT)/.build/go-cache" GOTMPDIR="$(ROOT)/.build/go-tmp" go test ./data-structures/list/tests -v

list-test-java: doctor
	@mkdir -p "$(JAVA_BUILD_DIR)"
	@javac -d "$(JAVA_BUILD_DIR)" $$(find data-structures/list -name '*.java' | sort)
	@java -cp "$(JAVA_BUILD_DIR)" MyArrayListTest

stack-status:
	@sed -n '1,220p' data-structures/journey.md
	@printf "\n"
	@sed -n '1,220p' data-structures/stack/IMPLEMENTATION_CHECKLIST.md

stack-problems:
	@sed -n '1,220p' data-structures/stack/problems/selected-problems.md

stack-test: stack-test-ts stack-test-go stack-test-java

stack-test-ts: doctor
	@mkdir -p "$(TS_BUILD_DIR)"
	@"$(TSC)" --project "$(TS_CONFIG)" --outDir "$(TS_BUILD_DIR)"
	@node "$(TS_BUILD_DIR)/stack/tests/stack.test.js"

stack-test-go: doctor
	@mkdir -p "$(ROOT)/.build/go-cache" "$(ROOT)/.build/go-tmp"
	@GOCACHE="$(ROOT)/.build/go-cache" GOTMPDIR="$(ROOT)/.build/go-tmp" go test ./data-structures/stack/tests -v

stack-test-java: doctor
	@mkdir -p "$(JAVA_BUILD_DIR)"
	@javac -d "$(JAVA_BUILD_DIR)" $$(find data-structures/stack -name '*.java' | sort)
	@java -cp "$(JAVA_BUILD_DIR)" MyStackTest

queue-status:
	@sed -n '1,220p' data-structures/journey.md
	@printf "\n"
	@sed -n '1,220p' data-structures/queue/IMPLEMENTATION_CHECKLIST.md

queue-problems:
	@sed -n '1,220p' data-structures/queue/problems/selected-problems.md

queue-test: queue-test-ts queue-test-go queue-test-java

queue-test-ts: doctor
	@mkdir -p "$(TS_BUILD_DIR)"
	@"$(TSC)" --project "$(TS_CONFIG)" --outDir "$(TS_BUILD_DIR)"
	@node "$(TS_BUILD_DIR)/queue/tests/queue.test.js"

queue-test-go: doctor
	@mkdir -p "$(ROOT)/.build/go-cache" "$(ROOT)/.build/go-tmp"
	@GOCACHE="$(ROOT)/.build/go-cache" GOTMPDIR="$(ROOT)/.build/go-tmp" go test ./data-structures/queue/tests -v

queue-test-java: doctor
	@mkdir -p "$(JAVA_BUILD_DIR)"
	@javac -d "$(JAVA_BUILD_DIR)" $$(find data-structures/queue -name '*.java' | sort)
	@java -cp "$(JAVA_BUILD_DIR)" MyQueueTest

ring-buffer-status:
	@sed -n '1,220p' data-structures/journey.md
	@printf "\n"
	@sed -n '1,220p' data-structures/ring-buffer/IMPLEMENTATION_CHECKLIST.md

ring-buffer-problems:
	@sed -n '1,220p' data-structures/ring-buffer/problems/selected-problems.md

ring-buffer-test: ring-buffer-test-ts ring-buffer-test-go ring-buffer-test-java

ring-buffer-test-ts: doctor
	@mkdir -p "$(TS_BUILD_DIR)"
	@"$(TSC)" --project "$(TS_CONFIG)" --outDir "$(TS_BUILD_DIR)"
	@node "$(TS_BUILD_DIR)/ring-buffer/tests/ring-buffer.test.js"

ring-buffer-test-go: doctor
	@mkdir -p "$(ROOT)/.build/go-cache" "$(ROOT)/.build/go-tmp"
	@GOCACHE="$(ROOT)/.build/go-cache" GOTMPDIR="$(ROOT)/.build/go-tmp" go test ./data-structures/ring-buffer/tests -v

ring-buffer-test-java: doctor
	@mkdir -p "$(JAVA_BUILD_DIR)"
	@javac -d "$(JAVA_BUILD_DIR)" $$(find data-structures/ring-buffer -name '*.java' | sort)
	@java -cp "$(JAVA_BUILD_DIR)" MyRingBufferTest

dynamic-ring-buffer-status:
	@sed -n '1,220p' data-structures/journey.md
	@printf "\n"
	@sed -n '1,220p' data-structures/dynamic-ring-buffer/IMPLEMENTATION_CHECKLIST.md

dynamic-ring-buffer-problems:
	@sed -n '1,220p' data-structures/dynamic-ring-buffer/problems/selected-problems.md

dynamic-ring-buffer-test: dynamic-ring-buffer-test-ts dynamic-ring-buffer-test-go dynamic-ring-buffer-test-java

dynamic-ring-buffer-test-ts: doctor
	@mkdir -p "$(TS_BUILD_DIR)"
	@"$(TSC)" --project "$(TS_CONFIG)" --outDir "$(TS_BUILD_DIR)"
	@node "$(TS_BUILD_DIR)/dynamic-ring-buffer/tests/dynamic-ring-buffer.test.js"

dynamic-ring-buffer-test-go: doctor
	@mkdir -p "$(ROOT)/.build/go-cache" "$(ROOT)/.build/go-tmp"
	@GOCACHE="$(ROOT)/.build/go-cache" GOTMPDIR="$(ROOT)/.build/go-tmp" go test ./data-structures/dynamic-ring-buffer/tests -v

dynamic-ring-buffer-test-java: doctor
	@mkdir -p "$(JAVA_BUILD_DIR)"
	@javac -d "$(JAVA_BUILD_DIR)" $$(find data-structures/dynamic-ring-buffer -name '*.java' | sort)
	@java -cp "$(JAVA_BUILD_DIR)" MyDynamicRingBufferTest

linked-list-status:
	@sed -n '1,220p' data-structures/journey.md
	@printf "\n"
	@sed -n '1,220p' data-structures/linked-list/IMPLEMENTATION_CHECKLIST.md

linked-list-problems:
	@sed -n '1,220p' data-structures/linked-list/problems/selected-problems.md

linked-list-test: linked-list-test-ts linked-list-test-go linked-list-test-java

linked-list-test-ts: doctor
	@mkdir -p "$(TS_BUILD_DIR)"
	@"$(TSC)" --project "$(TS_CONFIG)" --outDir "$(TS_BUILD_DIR)"
	@node "$(TS_BUILD_DIR)/linked-list/tests/linked-list.test.js"

linked-list-test-go: doctor
	@mkdir -p "$(ROOT)/.build/go-cache" "$(ROOT)/.build/go-tmp"
	@GOCACHE="$(ROOT)/.build/go-cache" GOTMPDIR="$(ROOT)/.build/go-tmp" go test ./data-structures/linked-list/tests -v

linked-list-test-java: doctor
	@mkdir -p "$(JAVA_BUILD_DIR)"
	@javac -d "$(JAVA_BUILD_DIR)" $$(find data-structures/linked-list -name '*.java' | sort)
	@java -cp "$(JAVA_BUILD_DIR)" MyLinkedListTest

hash-map-status:
	@sed -n '1,220p' data-structures/journey.md
	@printf "\n"
	@sed -n '1,220p' data-structures/hash-map/IMPLEMENTATION_CHECKLIST.md

hash-map-problems:
	@sed -n '1,220p' data-structures/hash-map/problems/selected-problems.md

hash-map-test: hash-map-test-ts hash-map-test-go hash-map-test-java

hash-map-test-ts: doctor
	@mkdir -p "$(TS_BUILD_DIR)"
	@"$(TSC)" --project "$(TS_CONFIG)" --outDir "$(TS_BUILD_DIR)"
	@node "$(TS_BUILD_DIR)/hash-map/tests/hash-map.test.js"

hash-map-test-go: doctor
	@mkdir -p "$(ROOT)/.build/go-cache" "$(ROOT)/.build/go-tmp"
	@GOCACHE="$(ROOT)/.build/go-cache" GOTMPDIR="$(ROOT)/.build/go-tmp" go test ./data-structures/hash-map/tests -v

hash-map-test-java: doctor
	@mkdir -p "$(JAVA_BUILD_DIR)"
	@javac -d "$(JAVA_BUILD_DIR)" $$(find data-structures/hash-map -name '*.java' | sort)
	@java -cp "$(JAVA_BUILD_DIR)" MyHashMapTest

tree-status:
	@sed -n '1,220p' data-structures/journey.md
	@printf "\n"
	@sed -n '1,220p' data-structures/tree/IMPLEMENTATION_CHECKLIST.md

tree-problems:
	@sed -n '1,220p' data-structures/tree/problems/selected-problems.md

tree-test: tree-test-ts tree-test-go tree-test-java

tree-test-ts: doctor
	@mkdir -p "$(TS_BUILD_DIR)"
	@"$(TSC)" --project "$(TS_CONFIG)" --outDir "$(TS_BUILD_DIR)"
	@node "$(TS_BUILD_DIR)/tree/tests/binary-search-tree.test.js"

tree-test-go: doctor
	@mkdir -p "$(ROOT)/.build/go-cache" "$(ROOT)/.build/go-tmp"
	@GOCACHE="$(ROOT)/.build/go-cache" GOTMPDIR="$(ROOT)/.build/go-tmp" go test ./data-structures/tree/tests -v

tree-test-java: doctor
	@mkdir -p "$(JAVA_BUILD_DIR)"
	@javac -d "$(JAVA_BUILD_DIR)" $$(find data-structures/tree -name '*.java' | sort)
	@java -cp "$(JAVA_BUILD_DIR)" MyBinarySearchTreeTest

heap-status:
	@sed -n '1,220p' data-structures/journey.md
	@printf "\n"
	@sed -n '1,220p' data-structures/heap/IMPLEMENTATION_CHECKLIST.md

heap-problems:
	@sed -n '1,220p' data-structures/heap/problems/selected-problems.md

heap-test: heap-test-ts heap-test-go heap-test-java

heap-test-ts: doctor
	@mkdir -p "$(TS_BUILD_DIR)"
	@"$(TSC)" --project "$(TS_CONFIG)" --outDir "$(TS_BUILD_DIR)"
	@node "$(TS_BUILD_DIR)/heap/tests/binary-min-heap.test.js"

heap-test-go: doctor
	@mkdir -p "$(ROOT)/.build/go-cache" "$(ROOT)/.build/go-tmp"
	@GOCACHE="$(ROOT)/.build/go-cache" GOTMPDIR="$(ROOT)/.build/go-tmp" go test ./data-structures/heap/tests -v

heap-test-java: doctor
	@mkdir -p "$(JAVA_BUILD_DIR)"
	@javac -d "$(JAVA_BUILD_DIR)" $$(find data-structures/heap -name '*.java' | sort)
	@java -cp "$(JAVA_BUILD_DIR)" MyBinaryMinHeapTest

graph-status:
	@sed -n '1,220p' data-structures/journey.md
	@printf "\n"
	@sed -n '1,220p' data-structures/graph/IMPLEMENTATION_CHECKLIST.md

graph-problems:
	@sed -n '1,220p' data-structures/graph/problems/selected-problems.md

graph-test: graph-test-ts graph-test-go graph-test-java

graph-test-ts: doctor
	@mkdir -p "$(TS_BUILD_DIR)"
	@"$(TSC)" --project "$(TS_CONFIG)" --outDir "$(TS_BUILD_DIR)"
	@node "$(TS_BUILD_DIR)/graph/tests/graph.test.js"

graph-test-go: doctor
	@mkdir -p "$(ROOT)/.build/go-cache" "$(ROOT)/.build/go-tmp"
	@GOCACHE="$(ROOT)/.build/go-cache" GOTMPDIR="$(ROOT)/.build/go-tmp" go test ./data-structures/graph/tests -v

graph-test-java: doctor
	@mkdir -p "$(JAVA_BUILD_DIR)"
	@javac -d "$(JAVA_BUILD_DIR)" $$(find data-structures/graph -name '*.java' | sort)
	@java -cp "$(JAVA_BUILD_DIR)" MyGraphTest

trie-status:
	@sed -n '1,220p' data-structures/journey.md
	@printf "\n"
	@sed -n '1,220p' data-structures/trie/IMPLEMENTATION_CHECKLIST.md

trie-problems:
	@sed -n '1,220p' data-structures/trie/problems/selected-problems.md

trie-test: trie-test-ts trie-test-go trie-test-java

trie-test-ts: doctor
	@mkdir -p "$(TS_BUILD_DIR)"
	@"$(TSC)" --project "$(TS_CONFIG)" --outDir "$(TS_BUILD_DIR)"
	@node "$(TS_BUILD_DIR)/trie/tests/trie.test.js"

trie-test-go: doctor
	@mkdir -p "$(ROOT)/.build/go-cache" "$(ROOT)/.build/go-tmp"
	@GOCACHE="$(ROOT)/.build/go-cache" GOTMPDIR="$(ROOT)/.build/go-tmp" go test ./data-structures/trie/tests -v

trie-test-java: doctor
	@mkdir -p "$(JAVA_BUILD_DIR)"
	@javac -d "$(JAVA_BUILD_DIR)" $$(find data-structures/trie -name '*.java' | sort)
	@java -cp "$(JAVA_BUILD_DIR)" MyTrieTest

list-clean:
	@rm -rf .build
