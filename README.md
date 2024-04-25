# Proyecto NOC

El objetivo de este proyecto es crear una serie de tareas usando Arquitectura Limpia con TypeScript

1. Clonar el archivo .env.template a .env
2. Configurar variables de entorno
3. Ejecutar ```npm install```
    ```
    PORT=3000

    MAIL=
    MAIL_SERVICE=
    MAILER_SECRET_KEY=
    MAIL_TO=
    ```
4. Levantar las bases de datos con el comando
    ```
    docker compose up -d
    ```

5. Ejecutar ```npm run dev```

## Obtener Gmail Key

[Google AppPasswords] (https://myaccount.google.com/u/0/apppasswords)
