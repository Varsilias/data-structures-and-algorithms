package tests

import (
	"fmt"
	"reflect"
	"testing"

	"dsa/data-structures/hash-map/implementations"
)

func TestHashMapSimpleNewHashMapStartsEmpty(t *testing.T) {
	hashMap := implementations.NewMyHashMap[string, int](4)

	if got := hashMap.Length(); got != 0 {
		t.Fatalf("expected length 0, got %d", got)
	}

	if got := hashMap.Capacity(); got != 4 {
		t.Fatalf("expected capacity 4, got %d", got)
	}

	if !hashMap.IsEmpty() {
		t.Fatal("expected map to be empty")
	}

	if got := hashMap.Keys(); len(got) != 0 {
		t.Fatalf("expected no keys, got %v", got)
	}
}

func TestHashMapSimpleSetGetHasAndOverwriteUseKeyEquality(t *testing.T) {
	hashMap := implementations.NewMyHashMap[string, int](4)

	hashMap.Set("red", 1)
	hashMap.Set("blue", 2)
	hashMap.Set("red", 9)

	if got := hashMap.Length(); got != 2 {
		t.Fatalf("expected length 2, got %d", got)
	}

	if got := hashMap.Get("red"); got != 9 {
		t.Fatalf("expected red to be 9, got %d", got)
	}

	if !hashMap.Has("blue") {
		t.Fatal("expected map to have blue")
	}

	if hashMap.Has("green") {
		t.Fatal("expected map not to have green")
	}
}

func TestHashMapSimpleRemoveDeletesOnlyTheRequestedKey(t *testing.T) {
	hashMap := implementations.NewMyHashMap[string, int](2)

	hashMap.Set("a", 1)
	hashMap.Set("b", 2)

	if !hashMap.Remove("a") {
		t.Fatal("expected remove(a) to return true")
	}

	if hashMap.Remove("x") {
		t.Fatal("expected remove(x) to return false")
	}

	if hashMap.Has("a") {
		t.Fatal("expected map not to have a after removal")
	}

	if got := hashMap.Keys(); !reflect.DeepEqual(got, []string{"b"}) {
		t.Fatalf("expected keys [b], got %v", got)
	}

	if got := hashMap.Values(); !reflect.DeepEqual(got, []int{2}) {
		t.Fatalf("expected values [2], got %v", got)
	}
}

func TestHashMapMildlyAbsurdManyInsertsSurviveResizingAndCollisions(t *testing.T) {
	hashMap := implementations.NewMyHashMap[string, int](2)

	for index := 0; index < 50; index++ {
		hashMap.Set(fmt.Sprintf("key-%d", index), index)
	}

	if got := hashMap.Length(); got != 50 {
		t.Fatalf("expected length 50, got %d", got)
	}

	if got := hashMap.Get("key-0"); got != 0 {
		t.Fatalf("expected key-0 to be 0, got %d", got)
	}

	if got := hashMap.Get("key-49"); got != 49 {
		t.Fatalf("expected key-49 to be 49, got %d", got)
	}

	if got := hashMap.Capacity(); got < 50 {
		t.Fatalf("expected capacity to grow to at least 50, got %d", got)
	}
}
