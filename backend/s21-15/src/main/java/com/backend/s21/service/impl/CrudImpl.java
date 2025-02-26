package com.backend.s21.service.impl;

import com.backend.s21.repository.IGenericRepo;
import com.backend.s21.service.ICRUD;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;

public abstract class CrudImpl<T, ID> implements ICRUD<T,ID> {

    abstract IGenericRepo<T,ID> getRepository();

    @Override
    public Page<T> findAll(Pageable pageable) {
        System.out.println("pageable = " + pageable); //pruebita
        return getRepository().findAll(pageable);
    }

    @Override
    public List<T> findAll() {
        return getRepository().findAll();
    }

    @Override
    public T findById(ID id) {
    //Change type of exception
        return getRepository().findById(id)
                .orElseThrow(() -> new RuntimeException("Id not found "+ id));
    }

    @Override
    public void deleteById(ID id) {

        getRepository().findById(id)
                .orElseThrow(() -> new RuntimeException("Id not found "+id));
        getRepository().deleteById(id);
    }

    @Override
    public T save(T t) {

        return getRepository().save(t);
    }

    @Override
    public T update(T t, ID id) throws InvocationTargetException, IllegalAccessException, NoSuchMethodException {

        getRepository().findById(id).orElseThrow(() -> new RuntimeException("Id not found "+id));
        Class<?> clazz = t.getClass();
        String nameMethod = "setId" + clazz.getSimpleName();
        Method method = clazz.getMethod(nameMethod, id.getClass());
        method.invoke(t, id);
        return getRepository().save(t);
    }
}
