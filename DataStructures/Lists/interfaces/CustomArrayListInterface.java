package DataStructure.interfaces;

public interface CustomArrayListInterface<T>{

    void add(T element);
    void add(int index, T element);
    T remove(int index);
    T get(int index);
    boolean contains(T element);

    String toString();
}
