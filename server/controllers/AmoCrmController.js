// const AmoCRM = require( 'amocrm-js' );

class AmoCrmController {

    // async amoAuth(req, res) {
    //     this.login()
    // }

    async amoAuth() {
         const crm = await new AmoCRM({
            // логин пользователя в портале, где адрес портала domain.amocrm.ru
            domain: 'terradigital.amocrm.ru', // может быть указан полный домен вида domain.amocrm.ru, domain.amocrm.com
            /*
              Информация об интеграции (подробности подключения
              описаны на https://www.amocrm.ru/developers/content/oauth/step-by-step)
            */
            auth: {
              client_id: '5a77fdcc-f695-4652-8c1b-75668cbde555', // ID интеграции
              client_secret: 'HhBKLHrXaUDmQZZaAp424ciUFnvP16kAWPW2eDZTJc7GS7cbgebnE6gqoLbwbGfR', // Секретный ключ
              redirect_uri: 'https://terradigital.ro', // Ссылка для перенаправления
              // code: 'code' // Код авторизации
              server: {
                  port: 3001
              }
            },
        });

        const url = crm.connection.getAuthUrl()

        console.log(url);

        const response = crm.request.get('/api/v4/leads')

        console.log(response.data);
    }

    async login() {
        return new Promise(function(resolve, reject) {
            var body = {
                USER_LOGIN: 'test@test.ru',
                USER_HASH: 'cda34df432332ac00123e4da3be34fds342342fsd',
            };

            var cookieForAmoCrm = [];

            /**
            * Преобразуем объект в строку
            */
            body = JSON.stringify(body);

            var options = {
                host: "yourhostname.amocrm.ru",
                path: "/private/api/auth.php?type=json",
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            var request = https.request(options, function(response) {
                /**
                * Срабатывает в момент ответа
                */
                response.on('data', function (chunk) {
                /**
                * Парсим ответ
                * @type {any}
                */
                var responseObj = JSON.parse(chunk);

                if (response.statusCode == 200) {
                /**
                * Сохраняем cookie
                */
                cookieForAmoCrm = response.headers['set-cookie'];
                    return resolve(responseObj);
                } else {
                    return reject(responseObj);
                }
            })
        })

        request.write(body);
        /**
         * заканчиваем формирование запроса и отсылаем запрос
         */
        request.end();

        })
    }
}

module.exports = function() {
    return new AmoCrmController()
}
