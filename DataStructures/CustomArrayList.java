/*
* @author Daniel Okoronkwo
*
* - This code was written in an environment that could perfectly run Java
* - You might access it in an environment that does not run Java
* - Feel free to copy and paste the code to an environment that runs Java if you intend to test
	- There is an accompanying interface that this class implements. Please make sure that you have the interface in place as well
 */

package DataStructure;

import DataStructure.interfaces.CustomArrayListInterface;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

public class CustomArrayList<T> implements CustomArrayListInterface<T>{

    private static final int DEFAULT_CAPACITY = 10;
    private T[] elements;

    private int index;
    public int length;

    public CustomArrayList() {

        this.elements = (T[]) new Object[DEFAULT_CAPACITY];
        this.index = 0;
        this.length = 0;
    }


    @Override
    public void add(T element) {
        this.ensureCapacity();
        this.elements[index] = element;
        this.index++;
        this.length++;
    }

    @Override
    public void add(int index, T element) {
        this.ensureCapacity();
        this.checkIndex(index);

        if (index == this.index) {
            this.elements[this.index] = element;

        } else {
            for (int i = this.index; i >= index; i--) {
                this.elements[i + 1] = this.elements[i];
            }
            this.elements[index] = element;
        }

        this.index++;
        this.length++;

    }

    public T remove(int index) {
        this.checkIndex(index);
        T element = this.elements[index];
        this.elements[index] = null;
        for (int i = index; i < this.length; i++) {
            this.elements[i] = this.elements[i + 1];
        }
        this.index--;
        this.length--;
        return element;
    }


    @Override
    public T get(int index) {
        this.checkIndex(index);
        return this.elements[index];
    }

    public CustomArrayList<T> slice(int startIndex, int endIndex) {

        this.checkIndex(startIndex);
        this.checkIndex(endIndex);
        int length = (endIndex - startIndex) + 1;

        CustomArrayList<T> slice = new CustomArrayList<>();
        for (int i = startIndex; i < endIndex; i++) {
            slice.add(this.elements[i]);
        }

        return slice;

    }
    // Coming Soon
    public void sort() {

    }

    public void reverse () {

        for (int i = 0; i < Math.round((float) this.length / 2); i++) {
            int max = this.length - i - 1;
            // keep a temporary reference to the element at the current maximum index using the formula(length - i - 1)
            T temp = this.elements[max];

            // set the element at the other end to the element at the current index
            this.elements[max] = this.elements[i];

            // Do the reverse of the above logic

            this.elements[i] = temp;
        }

    }

    public int indexOf(T element) {
        for (int i = 0; i < this.length; i++) {
            if (this.elements[i] == element) {
                return i;
            }
        }
        return -1;
    }


    @Override
    public boolean contains(T element) {
        return this.indexOf(element) >= 0;
    }

    private void checkIndex(int index) throws IndexOutOfBoundsException {
        if (index < 0 || index >= this.index) {
            throw new IndexOutOfBoundsException("Illegal Index: " + index);
        }
    }

    private void ensureCapacity() {
        // If the underlying array is 80% filled we create
        // a new array and copy over the elements of the previous array
        int percentFilled = (this.index * 100) / this.elements.length;

        if(percentFilled >= 80) {
            T[] currentElements = this.elements;
            this.elements = (T[]) new Object[this.elements.length * 2];
            System.arraycopy(currentElements, 0, this.elements, 0, currentElements.length);
        }

    }

    @Override
    public String toString() {
        StringBuilder result = new StringBuilder("CustomArrayList {");
        for (int i = 0; i < this.elements.length; i++) {
            result.append(i).append(": ").append(this.elements[i]);

            if(i == this.elements.length - 1) {
                result.append("}");
            } else {
                result.append(", ");
            }
        }
        return result.toString();
    }


}
