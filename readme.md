# Prueba técnica Qualabs - Santiago Souto

Ambas partes de la prueba se realizaron en un mismo archivo de código. El lenguaje utilizado fue Javascript, utilizando el framework Node JS versión 16.13.0.

Para ejecutar el código, desde la línea de comandos, en el directorio actual (./) se tienen dos opciones que llevan al mismo resultado:

```shell
> $ node app.js
-----------------
> $ npm start
```

## Parte A

Esta parte deja un archivo JSON en el directorio **./output/** con el nombre **_parteA.json_** con el formato pedido en la consigna:

```json
{
    "auth_module":
    {
        "authn.provider_1": [....],
        .
        .
        .
    },
    "content_module":
    {
        "authz.provider_1": [....],
        .
        .
        .
    }
}
```
Cabe destacar que el archivo es reemplazado cada vez que se ejecuta el código. Esta parte me tomo un poco menos de **6 horas** realizarlo, teniendo en cuenta que comencé con un repaso de javascript y demás.

## Parte B
Esta parte imprime en pantalla (línea de comandos) una lista con la minima cantidad de usuarios que con ellos se cubren todos los módulos existentes. No creo que la forma de hacerlo (con un _BigO(n^3)_) se la más eficiente, pero no se me ocurrió una mejor, si bien me gustaría conocerla.

Output:
```shell
> $ [..., ..., ...]
```

Esta parte fue más desafiante, por lo que me tomó unas **8 horas** realizarla, teniendo en cuenta que me tomé tiempo para buscar mejores soluciones, pero no llegué a encontrar.

## Conclusión
Tomando todo en consideración, me tomó unas **14 horas** completar la consigna, teniendo en cuenta que estas fueron intermitentes. Disfruté mucho el desafío y me siento satisfecho con lo que logré, siempre abierto a feedback. 

Muchas gracias!

### Santiago Souto.